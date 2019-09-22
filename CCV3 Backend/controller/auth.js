const bcrypt=require('bcryptjs')
const User=require('./../model/user')
const Doc=require('./../model/docs')
const jwt=require('jsonwebtoken')
const crypto=require('crypto')


const nodemailer=require('nodemailer')
const sendgridTransport=require('nodemailer-sendgrid-transport')

const transporter=nodemailer.createTransport(
    sendgridTransport({
        auth: {
            api_key: process.env.sendGridAPIKey
        }
    })
)


exports.docUpload=(req,res,next)=>{
    // console.log("File uploaded successfully using multer:) "+new Date())
    // console.log("req.file:")
    // console.log(req.file)
    // console.log("req.file.location: #######")
    // console.log(req.file.location)
    // console.log("req.file.key: #######")
    // console.log(req.file.key)
    res.status(200).json({ msg: "File uploaded successfully!", filename: req.file.key, fileLocation: req.file.location, originalname: req.file.originalname })
}

exports.postSignup=(req,res,next)=>{
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const gender=req.body.gender;
    const email=req.body.email;
    var password=req.body.password;
    var imgUrl=req.body.imgUrl;
    if(gender=="male")
    {
        imgUrl="assets/images/m_img_avatar.png";
    }
    else
    {
        imgUrl="assets/images/f_img_avatar.png";
    }
    const dateCreated=Date.now()
    
    //Encrypting password
    bcrypt.hash(password,12)
    .then(hashedPassword=>{
        const user=new User({
            firstName: firstName,
            lastName: lastName,
            email:email,
            password: hashedPassword,
            gender: gender,
            imgUrl: imgUrl,
            dateCreated:dateCreated,
            emailVerified: false,
            starred: [], 
            uploaded: [], 
            pwdToken: null,
            pwdTokenExp: null,
            admin: false,
            bio: null
            })

            User.findOne({email: email})
            .then(userStored=>{
                // console.log("userStored")
                // console.log(userStored)
                if(!userStored)
                {
                    user.save()
                    .then(result=>{
                        // console.log(result)
                        res.status(201).json({msg: 'Details successfully stored! A link has been sent to your email, click the link to verify your email. (Mail might be stored in spam section)',user: {}})
                        // console.log("Result")
                        // console.log(result._id)
                        transporter.sendMail({
                            to: result.email,
                            from: process.env.mailFrom,
                            subject: 'Email verify: Coconut Catalogue',
                            html: `
                            <h1>Email verify</h1>
                            <p>Click the link below to verify your email..
                            </p>
                            <a href="${process.env.frontEndLink}/emailVerify/${result._id}">Verify</a>
                            `
                        })
                    })
                    .catch(err=>{
                        console.log(err)
                        res.status(501).json({msg: 'Error: cannot save data',user: {}})
                    })
                    
                }
                else
                {
                    res.status(401).json({msg: "Email already exists", user: {}})
                }
            
            })

    })

}


exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email: email})
    .then(user=>{
        // console.log(user)
        if(!user)
            res.status(401).json({msg: "Email not found",token: null, expiresIn: null})
        else
        {
            bcrypt.compare(password,user.password)
            .then(
                doMatch=>{
                    if(!doMatch)
                    {
                        res.status(401).json({msg: "Incorrect password",token: null, expiresIn: null})
                    }
                    else
                    {
                            var firstNAme=user.firstName;
                            var b1=new Buffer.from(firstNAme)
                            firstNAme=b1.toString('base64')

                            var lastNAme=user.lastName;
                            var b2=new Buffer.from(lastNAme)
                            lastNAme=b2.toString('base64')
                            

                            const token=jwt.sign(
                                {
                                    firstName: firstNAme, 
                                    lastName: lastNAme, 
                                    email: user.email, 
                                    gender: user.gender, 
                                    imgUrl: user.imgUrl, 
                                    dateCreated: user.dateCreated, 
                                    emailVerified: user.emailVerified,
                                    starred: user.starred, 
                                    uploaded: user.uploaded, 
                                    pwdToken: user.pwdToken,
                                    pwdTokenExp: user.pwdTokenExp,
                                    admin: user.admin,
                                    bio: user.bio
                                },
                                process.env.loginToken,
                                {expiresIn: '1h'}
                            )

                            res.status(200).json(
                                    {msg: "Logged In successfully",token: token, expiresIn: 3600*1000}
                                )
                    }
                }
            )
        }
    })
}

exports.patchUserAuthenticated=(req,res,next)=>{
    const id=req.params.ObjectID;
    User.findOne({_id: id})
    .then(user=>{
        if(!user)
        {
            res.status(400).json({msg: "Email can't be verified!"})
        }
        if(user)
        {
            user.emailVerified=true;
            user.save()
            res.status(202).json({msg: "Email verified! Now go to login."})
        }
    })
    .catch(err=>{console.log(err)})
}

exports.forgotPassword=(req,res,next)=>{
    const email=req.body.email;

    User.findOne({email: email})
    .then(userStored=>{
        // console.log("userStored")
        // console.log(userStored)
        if(!userStored)
        {
            return res.status(406).json({msg: `Email ${email} is not registered with us.`})
        }
        crypto.randomBytes(32,(err,buffer)=>{
            if(err)
            {
                return console.log(err)
            }
            const token=buffer.toString('hex')
            // console.log(token)
            userStored.pwdToken=token
            userStored.pwdTokenExp=new Date(new Date().getTime()+3600000)
            userStored.save()
            return transporter.sendMail({
                to: userStored.email,
                from: process.env.mailFrom,
                subject: 'Reset password: Coconut Catalogue',
                html: `
                <h1>Reset password link</h1>
                <p>Go to the below link to reset password:-<br>
                Link will expire after 1 hour.
                </p>
                <a href="${process.env.frontEndLink}/user/resetPassword/${userStored.pwdToken}">Reset password</a>
                `
            })
        })
        
        res.status(200).json({msg: `Email with the password reset link has been sent to ${email}. Link will expire after 1 hour.`})
    })
    .catch(err=>{
        console.log(err)
        res.status(406).json({msg: `Some error occured!`})
    })
}

exports.resetPassword=(req,res,next)=>{
    const pwdToken=req.body.pwdToken;
    User.findOne({pwdToken:pwdToken})
    .then(
        user=>{
            // console.log("Accessing backend data:")
            // console.log(user.pwdToken)
            // console.log(user.pwdTokenExp.getTime())
            // console.log(new Date().getTime())
            if(user.pwdToken==pwdToken)
            {
                if(new Date().getTime()<user.pwdTokenExp.getTime())
                {
                    return res.status(200).json({authorized: true,msg: user.email})
                }
                else
                {
                    return res.status(408).json({authorized: false,msg: "Link expired: Go to Forgot password again."}) 
                }

            }
            else
            {
                return res.status(406).json({authorized: false,msg: "Invalid Link: Token not recognized."}) 
            }
        }
    )
    .catch(
        err=>{
            console.log("ErRoR:"+err)
            return res.status(500).json({authorized: false,msg: "Invalid Link: user not found"})
        }
    )
}

exports.resetPasswordSubmit=(req,res,next)=>{
    const pwdToken=req.body.pwdToken;
    const password=req.body.password;
    const cpassword=req.body.cpassword;
    if(password===cpassword)
    {
        User.findOne({pwdToken: pwdToken})
        .then(storedUser=>{
                if(new Date().getTime()<storedUser.pwdTokenExp.getTime())
                {
                    bcrypt.hash(password,12)
                    .then(hashedPassword=>{
                        storedUser.password=hashedPassword;
                        storedUser.pwdToken=null;
                        storedUser.pwdTokenExp=null;
                        storedUser.save();
                        return res.status(200).json({msg: "New password has been set up."}) 
                    })
                }
                else
                {
                    return res.status(408).json({msg: "Link expired: Go to Forgot password again."}) 
                }
        })
        .catch(err=>{
            console.log(err);
            return res.status(408).json({msg: "Link expired: Go to Forgot password again."});
        })
    }
}

exports.changePasswordSubmit= (req,res,next)=>
{
    const email=req.body.email;
    const currentPassword=req.body.currentPassword;
    const password=req.body.password;
    const cpassword=req.body.cpassword;

    User.findOne({email:email})
    .then(user=>{
        bcrypt.compare(currentPassword,user.password)
        .then(
            doMatch=>{
                if(doMatch)
                {
                    if(password==cpassword)
                    {
                        bcrypt.hash(password,12)
                        .then(hashedPassword=>{
                            user.password=hashedPassword
                            user.save()
                            res.status(200).json({msg: 'Password has been successfully changed.'})
                        })                    
                    }
                    else
                    {
                        res.status(500).json({msg: 'New password cant be confirmed.'})
                    }
                }
                else
                {
                    res.status(500).json({msg: 'Wrong current password.'})
                }
            }
        )
    })
    
}

exports.updateProfileSubmit=(req,res,next)=>{
    const email=req.body.email;
    const firstName=req.body.firstName;
    const lastName=req.body.lastName;
    const gender=req.body.gender;
    const bio=req.body.bio;

    User.findOne({email: email})
    .then(
        user=>{
            user.firstName=firstName;
            user.lastName=lastName;
            user.gender=gender;
            user.bio=bio;
            user.save()
            res.status(200).json({msg: "Profile successfully updated"})
        },
        err=>{
            console.log(err)
            res.status(500).json({msg: "Could not update user!"})
        }
    )
}

exports.addDocPost=(req,res,next)=>{
    const heading=req.body.heading;
    const text=req.body.text;
    const subject=req.body.subject;
    const authorized=true;
    const author=req.body.author;
    const dateCreated=new Date();
    const dateAuthorized=null;
    const views=0;
    const comments=null;

    const doc=new Doc({
        heading: heading,
        text: text,
        subject: subject,
        authorized: authorized,
        author: author,
        dateCreated: dateCreated,
        dateAuthorized: dateAuthorized,
        views: views,
        comments: comments
    })
    doc.save()
    .then(
        result=>{
            // console.log(result)
            res.status(200).json({msg: "Successfully uploaded!"})
        }
    )   
    .catch(err=>{
        console.log(err)
        res.status(500).json({msg: "Could not upload!"})
    })
}

exports.docUploadFormSubmit=async (req,res,next)=>{
    // console.log("Reached controller!")
    // console.log(req.body)
    const heading= req.body.heading;
    const text= req.body.text;
    const subject= req.body.subject;
    const userFirstName= req.body.userFirstName;
    const userEmail= req.body.userEmail;
    const fileLocation= req.body.fileLocation;
    const filename= req.body.filename;
    const originalname= req.body.originalname;
    var author=(await User.findOne({email: userEmail}))._id;
    const course=req.body.course;
    const stream=req.body.stream;
    // console.log("Heading: "+heading);
    // console.log("Text: "+text);
    // console.log("Subject: "+subject);
    // console.log("User Email: "+userEmail);
    // console.log("fileLocation: "+fileLocation);
    // console.log("filename: "+filename);
    // console.log("originalname: "+originalname);
    // console.log("author: "+author);
    // console.log("userFirstName: "+userFirstName);

    const doc=new Doc({
        heading: heading,
        text: text,
        course: course,
        stream: stream,
        subject: subject,
        authorized: false,
        userEmail: userEmail,
        author: author, 
        dateCreated: new Date(),
        fileLocation: fileLocation,
        filename: filename,
        originalname: originalname,
        userFirstName:userFirstName,
        rejected: false
    })
    doc.save()
    .then(result=>{
        User.findOne({email: result.userEmail})
        .then(loadedUser=>{
            arr=loadedUser.uploaded
            arr.push(result._id)
            loadedUser.uploaded=arr
            loadedUser.save()
            .then(response=>{
                // console.log("Success")
                return res.status(200).json({msg: "Docs form successfully uploaded!", success: true})
            })
            .catch(err=>{
                console.log("Error")
                console.log(err)
                return res.status(501).json({msg: "Docs form unsuccessful!", success: false})
            })
        })
        .catch(err=>{
            console.log("Error")
            console.log(err)
            return res.status(501).json({msg: "Docs form unsuccessful!", success: false})
        })
        
    })
    .catch(err=>{
        console.log(err)
        return res.status(501).json({msg: "Docs form unsuccessful!", success: false})
    })
}

exports.getUnauthDocs=(req,res,next)=>{
    const ITEMS_PER_PAGE=parseInt(process.env.unauth_ITEMS_PER_PAGE);
    const page=req.params.page;
    var totalPages;
    var totalD;

    Doc.find({authorized: false,rejected: false})
    .countDocuments()
    .then(totalDocs=>{
        totalD=totalDocs;
        totalPages=parseInt(totalDocs/ITEMS_PER_PAGE);
        if((totalDocs%ITEMS_PER_PAGE)>0)
        {
            totalPages++;
        }
        return Doc.find({authorized: false,rejected: false})
        .skip((page-1)*ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE)
    })
    .then(docsArray=>{
        // console.log("DOCS Array:-")
        // console.log(docsArray)
        res.status(200).json({
            docsArray: docsArray,
            totalPages: totalPages,
            totalDocs: totalD
        })
    })
}

exports.authorizeDoc=(req,res,next)=>{
    // console.log("Req.body: authorize")
    // console.log(req.body)

    Doc.findOne({filename: req.body.filename})
    .then(recoveredDoc=>{
        if(recoveredDoc)
        {
            recoveredDoc.authorized=true;
            recoveredDoc.save()
            .then(saved=>{
                if(saved)
                {
                    res.status(200).json({
                        success: true,
                        status: "Doc authorized!"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    success: false,
                    status: "Could not authorize doc!"
                })
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            success: false,
            status: "Could not find doc to be authorized!"
        })
    })
    
}

exports.rejectDoc=(req,res,next)=>{
    // console.log("Req.body: reject")
    // console.log(req.body)

    Doc.findOne({filename: req.body.filename})
    .then(recoveredDoc=>{
        if(recoveredDoc)
        {
            recoveredDoc.rejected=true;
            recoveredDoc.authorized=false;
            recoveredDoc.save()
            .then(saved=>{
                if(saved)
                {
                    res.status(200).json({
                        success: true,
                        status: "Doc rejected!"
                    })
                }
            })
            .catch(err=>{
                console.log(err)
                res.status(500).json({
                    success: false,
                    status: "Could not reject doc!"
                })
            })
        }
    })
    .catch(err=>{
        console.log(err)
        res.status(500).json({
            success: false,
            status: "Could not find doc to be rejected!"
        })
    })
    
}