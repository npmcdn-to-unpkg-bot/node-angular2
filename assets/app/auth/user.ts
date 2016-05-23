export class User {

    // Look at the properties in the constructor, What I do here is something beautiful.
    // I instantly define the properties as public. This wil get the properties and also,
    // create a field in this class like this.email. Less code, and do the same thing. :-)
    constructor(public email: string, public password: string, public firstName?: string, public lastName?: string){
        this.email = email;
    }
}
