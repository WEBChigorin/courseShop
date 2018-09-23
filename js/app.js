//variables

const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');
const clearCartBtn = document.querySelector('#clear-cart');


//Event Listeners

loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', byCourse);

    //When the removed button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    //remove all carts
    clearCartBtn.addEventListener('click', clearCart);

    //Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage); 
}







//Functions

function byCourse(event) {
    event.preventDefault();
    //Use Delegation to find the course that was added
    if(event.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = event.target.parentElement.parentElement; //div 'card'

        //read the values
        getCourseInfo(course);
    }
}

//Reads the HTML information of the selected course
function getCourseInfo(course) {

    //Create an Object with Course Data
    const courseInfo = {
        image: course.querySelector('img').src, // get the src of the image
        title: course.querySelector('h4').textContent, //get the text from the h4
        price: course.querySelector('.price span').textContent,
        id: course.querySelector('a').getAttribute('data-id') //get the id of the a
    }
    //Insert into the shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart

function addIntoCart(course) {   // course = courseInfo from previous func.()
    //create a <tr>
    const row = document.createElement('tr');

    //Build the template. course = courseInfo object
    row.innerHTML = `
        <tr>
            <td>
                <img width = 100 src="${course.image}">  
            </td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;
    //Add into the shopping cart 
    shoppingCartContent.appendChild(row);

    //Add into Storage

    saveIntoStorage(course); //course = courseInfo object 
}

//Add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();

    //add the course into the array
    courses.push(course);

    //since storage only saves strings, we need to convert JSON into String
    localStorage.setItem('courses', JSON.stringify(courses));
}

//Get the content from the storage
function getCoursesFromStorage() {

    let courses;

    //if something exists on storage then we get the value
    //otherwise create an empty array
    if(localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

//remove course from the DOM

function removeCourse(event) {

    let course, courseId;

    if(event.target.classList.contains('remove')) {
        event.target.parentElement.parentElement.remove();
        course = event.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
     console.log(courseId);
    // remove from local storage
    removeCourseLocalStorage(courseId);
}

function removeCourseLocalStorage(id) {
    //get the data form local storage
    let coursesLS = getCoursesFromStorage();

    //loop trough the array and find the index to remove
    coursesLS.forEach(function(courseLS, index){
        if(courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });

    //add the rest of the array
    localStorage.setItem('course', JSON.stringify(coursesLS));
}

//Clears the shopping cart
function clearCart(event) {
    //first way
   // shoppingCartContent.innerHTML = ''; // we just overide it's content 

   while(shoppingCartContent.firstChild) {
       shoppingCartContent.removeChild(shoppingCartContent.firstChild); //more recomended way
   }

   //clear from local storage
   clearLocalStorage();
}

//clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

//Load when document is ready and print courses into shopping cart

function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage(); //call the previously created function

    //LOOP through the courses and print into the cart
    coursesLS.forEach(function(course){
        //create the <tr>
        const row = document.createElement('tr');

        //Print the content
        row.innerHTML = `
            <tr>
                <td>
                    <img width = 100 src="${course.image}">  
                </td>
                <td>${course.title}</td>
                <td>${course.price}</td>
                <td>
                    <a href="#" class="remove" data-id="${course.id}">X</a>
                </td>
            </tr>
        `;
        shoppingCartContent.appendChild(row);
    });

}