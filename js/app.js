//variables

const courses = document.querySelector('#courses-list');
const shoppingCartContent = document.querySelector('#cart-content tbody');


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
                <img src="${course.image}">  
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
}