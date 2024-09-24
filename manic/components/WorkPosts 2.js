{/* This file contains implementation of work posts  */}

class WorkPost {
    constructor(id, name, Location, duration, source, sourceUse) {
        this.id = id;
        this.name = name;
        this.Location = Location;
        this.duration = duration;
        this.source = source;
        this.User = User; //sourceUser will be the same as User since theyre using the same object 
    }
}

class Location {
    constructor(streetNum, streetName, city, zip){
        this.streetNum = streetNum;
        this.streetName = streetName;
        this.city = city;
        this.zip = zip;
    }
}

export default function WorkPosts() {

    const createPost = () => {
        {/* use the form package to allow user to fill out form and create 
        a WorkPort object. When the form is filled out, the constructor should be 
        called to create object. Once created, the post should be sent to the database
        and set to viewed by friends. */}
    }    
    const sharePost = () => {
        {/* this function will be called when the post is created and is time to
        be shared.

        similar to the create invoice in the dashboard next.js project, 
        users will fill out a form to create a post. */}
    }


    const searchPost = () => {
        {/* users will use a seachbar to search posts. */}
    }

    const viewPost = () => {
        {/* Let users see posts in a 'grid' or some other view. When users click
        on a post, they are able to see the full information. 
    
        possible view: similar to sticker smash app where invoices were viewed as tiles*/}
    }


}
