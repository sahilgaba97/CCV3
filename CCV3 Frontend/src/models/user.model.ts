export class User
{
    constructor(
        private _token: any,
        private expDate: Date
    )
    {}

    get token()
    {
        if(!this.expDate || this.expDate < new Date())
        {
            return null;
        }
        return this._token;
    }    
}
        // constructor(
        //     public firstName: string,
        //     public lastName: string,
        //     public email: string,
        //     public gender: string,
        //     public imgUrl: string,
        //     public dateCreated: Date, 
        //     public starred: [],
        //     public uploaded: [], 
        //     public emailVerified: boolean
        // ){}