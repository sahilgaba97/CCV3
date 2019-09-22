import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {environment} from 'src/environments/environment';

@Injectable()
export class GenericService
{
    finalLink:string;
    constructor(private http: HttpClient){}

    getSubjectDocs(subEndpoint: string,page: number)
    {
        // this.finalLink='http://ec2-13-233-190-143.ap-south-1.compute.amazonaws.com:3000/generic/'+subEndpoint+'/'+page;
        this.finalLink=environment.backendLink+'/generic/'+subEndpoint+'/'+page;
        // console.log('final link:')
        // console.log(this.finalLink)
        return this.http.get<{docsArray: any,totalPages: any,totalDocs: any}>(this.finalLink)
    }
}