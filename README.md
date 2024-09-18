# E-Commerce-Store
This is a Full-Stack application, using the PERN stack (Postgres, Express, Node, React), based on an ecommerce store, 
in which a user is able to select the products, and sort them how they like. They can add selected products to their
cart, which will be saved inbetween sessions if the user logs in. When they are finished they can pay via the checkout.
The user will also see previous purchases in the order history on their account details page.

## Project Description
I wanted this project to mimic a real life ecommerce store as much as possible, so i added a number of features such as
Google Authentication, Log in and Register pages, Stripe payment integration, and i am happy with the result.
The hardest part of this project was the authentication and having log ins persist through sessions.

### Languages and Libraries Used
* React
* Redux
* Node.js
* Express.js
* Express-Session
* Google OAuth 20
* Passport.js
* Google Passport
* Stripe Checkout
* Axios
* Bcrypt
* PostgreSQL
* Node-Postgres
* Framer-Motion
* HTML
* CSS
* JavaScript

## Project Demonstration

### Homepage

![Homepage1](https://github.com/user-attachments/assets/b089a8b9-8189-4bed-b3c6-011731709f3b)

* Here is the top of the Homepage, where the user sees a rotating carousel of images depicting the new clothing the store has. From the header, the user
can return to the homepage, access the products, their account, the checkout, or open their shopping cart. At all times they can see the quantity of 
items in their current shopping cart.

![Homepage2](https://github.com/user-attachments/assets/cd8ced89-cb24-41fe-b356-3237238b20bf)

* The second half of the homepage contains a product spotlight of a new range of trainers, which have animated text when the user hovers over them. It also 
contains a grid of logos of brands that the store stocks, and a short contact us section in the footer.

### Product List

![ProductPage](https://github.com/user-attachments/assets/299f5142-211b-4d5b-8e7e-a976f1b52d2a)

* Here is an example of the product page, the user is able to sort through the products with a criteria of their choosing.

### Product Page

![Product1](https://github.com/user-attachments/assets/87186a31-049c-414c-b202-ba1121b622fb)

* Here is the product details page, once an item has been selected. The user can see the picture, information on the product, and it's price, and then select
the size that they would like to buy when they are ready. Below this is a customer reviews section, to help the user inform their choice.

![Product2](https://github.com/user-attachments/assets/1d7b2976-48cd-40ff-b34f-8bf2a97d1d67)

* The second part of the product details page rerenders some of the product list into a "discover more items" section, and the user can select one of these items
to rerender the product details page with that product instead.

### Account Setup

![login](https://github.com/user-attachments/assets/9d9435ac-a07b-48d2-ab50-e01688cf1205)

* If the user tries to access the account page while not authorised, they will instead see the Login screen, where they can either log in, switch to the Register
form, or authenticate through Google.

![register](https://github.com/user-attachments/assets/e66a20f0-56df-4ab9-9442-0101c780844b)

* Here is the Registration Form

  ![google](https://github.com/user-attachments/assets/80a5c0fd-a6df-4fe7-aa8e-4575ca9fc578)

* This is What the user will be redirected too if they choose Google Authentication
  
![googleauth](https://github.com/user-attachments/assets/25c8ebda-e0ad-450e-a407-8864d85b2cec)

* Here is an example of what will be stored in the Postgres database for a user who has used Google authentication, we can see they lack a number of pieces of info
that a normal user would have.

### Shopping Cart

![image](https://github.com/user-attachments/assets/5c75f3eb-47bf-445c-b0b4-3289ea502f51)
* Here is an Example of a Shopping Cart, all of the items are on display, with an option to remove them from the cart. If the user is not logged in, this is considered a temporary cart, and they will be prompted to log in, which will change the items to a regular shopping cart which will be saved in the database, and
then the user can come back to it at a later time.

![image](https://github.com/user-attachments/assets/0cab012b-0938-4070-be04-2b2bafdb9782)
* If the user is logged in, their cart items are saved, and the reminder to log in is not present.

### Account Page
![image](https://github.com/user-attachments/assets/28224c6f-9707-4425-b19b-c24943da3e44)

* The Account Page, where our user can see their previous orders, continue to the checkout page or log out.


### Checkout
![image](https://github.com/user-attachments/assets/084a2b71-69b4-40e7-8a79-159ab64c0b30)
* The Checkout Page

![image](https://github.com/user-attachments/assets/f98cdb66-8f0d-454a-abea-fda543208f10)
* Example of the Stripe Payment Page




