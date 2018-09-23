//variables

const courses = document.querySelector('#courses-list');


//Event Listeners

loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', byCourse);
}







//Functions

function byCourse(event) {
    event.preventDefault();
    //Use Delegation to find the course that was added
    if(event.target.classList.contains('add-to-cart')) {
        // read the course values
        const course = event.target.parentElement.parentElement;

        //read the values
        getCourseInfo(course);
    }
}

//Reads the HTML information of the selected course
function getCourseInfo(course) {
    
}