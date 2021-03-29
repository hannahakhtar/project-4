### ![GA](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png) General Assembly, Software Engineering Immersive

# Garms - Project 4

## Overview

Garms is an app which allows users to buy and sell pre-loved clothes, accessories, shoes and more. The project was completed over the course of a week in a team of three and is deployed on [Heroku](https://garms-shopping.herokuapp.com/).

by [Hannah Akhtar](https://github.com/hannahakhtar), [India Kalff](https://github.com/ikalff) and [Jake Aston](https://github.com/Jacobaston).

## The Brief

* **Build a full-stack application** by making your own back-end and your own front-end
* **Use an Flask API** to serve your data from a Postgres database
* **Consume your API with a separate front-end** built with React
* **Be a complete product** which most likely means multiple relationships and CRUD functionality for at least a couple of models
* **Implement thoughtful user stories/wireframes** that are significant enough to help you know which features are core MVP and which you can cut
* **Be deployed online** so it's publicly accessible.

## Technologies Used

### Back-end:

- Python
- Flask
- Marshmallow
- SQLAlchemy
- PostgreSQL
- Bcrypt
- Pytest

### Frontend:

- HTML5
- SCSS
- JavaScript
- React.js
- Axios (library)
- React Router DOM
- React Hook Form
- React Share

### Other:

- VS code
- Pipenv/npm
- Insomnia
- Git
- Github
- Google Chrome dev tools
- Heroku (deployment)
- Trello Board (planning and timeline)
- PhotoShop (wireframe)
- Zoom
- Slack
- Table Plus

## Approach

### Day 1 - Planning

As a group, we decided that building an e-commerce website would be a great experience, and so, Garms was born!

We all wanted to be involved in the full-stack development of the app. We also decided early on that we should develop it to be fully responsive and was built as mobile first. With that in mind we used photoshop to create a storyboard/wireframe as well QuickDBD for the models we required and the relationships between them.

Photoshop was used to create a wireframe and plan the user journey:

![Wireframe image](/assets/Wireframe.png)

<br/>

QuickDBD was used to plan the models that were required and the relationships between them.

![Models/relationship planning image](/assets/QuickDBD.png)

<br/>

Trello was used to plan our MVP and to create user stories for the front end, and back end requriements. Tickets were then assigned to make sure that work was split evenly and to assure that all requirements were complete.

![KanBan planning image](/assets/KanBan.png)

<br/>

Git and GitHub were used for version control and had constant communication during pushes and pulls to reduce and fix any merge conflicts.

We scheduled a stand up each day to discuss what tickets were complete, what tickets were being worked on and support requirements. 

### Backend - Days 2 & 3

For the backend, a Postgres database was used to serve a Flask API. For the backend, as Python and Flask were new technologies, we all wanted to increase our experience. Therefore, we pair (triple) programmed the backend.

As a result of our substantial planning, we were confident in the relationships between each of our models. There were four models in total (product, user, wishlist and order history), as well as the base model.

Below is the product model, and it was important here to ensure the ForiegnKey and relationships between models were correct. One area I found challenging intially was the cascading e.g. if a user account was deleted, this should not delete the product as this would still need to show in a buyer's account. Once I understood this, finalising the models was much easier.

```py
class Product(db.Model, BaseModel):
    __tablename__ = "product"

    product_name = db.Column(db.Text, nullable=False)
    product_image = db.Column(db.Text, nullable=False)
    brand = db.Column(db.Text, nullable=True)
    size = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    condition = db.Column(db.Text, nullable=False)
    in_stock = db.Column(db.Boolean, nullable=False)
    gender = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"))

    wishlist = db.relationship('Wishlist', backref='product', cascade="all, delete")
    order_history = db.relationship('OrderHistory', backref='product', cascade="all, delete")
```
<br/>

Once we had the models, we split the controllers that would be required and all wrote a proportion each. I took ownership of the wishlist and order history controllers.

<br/>

Serializers were also created and these were tested in Table Plus to ensure we had all the required data. Due to the relationships between tables, all schemas had nested fields. To ensure that there were no circular import errors, 'simple' schemas were created. An example of this is below; in the user schema, the product, order history and wishlist IDs were nested. We wanted to be able to see the ID of the user which a product related to, so SimpleUserSchema was created so that this could be nested within the ProductSchema.

```py
from app import ma
from models.user import User
from marshmallow import fields

class UserSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = User
        load_instance = True
        exclude = ('password_hash',)
        load_only = ('password')

    password = fields.String(required=True)
    product = fields.Nested('ProductSchema', many=True)
    order_history = fields.Nested('OrderHistorySchema', many=True)
    wishlist = fields.Nested('WishlistSchema', many=True)

    class SimpleUserSchema(ma.SQLAlchemyAutoSchema):
        class Meta:
            model = User
            load_instance = True
            exclude = ('password_hash', 'first_name', 'last_name', 'location', 'created_at')
            load_only = ('email', 'password')

        password = fields.String(required=True)
```
<br/>

We created decorators for erros, logging and secure route. Secure route was used to check if a user had a valid token, and if they did, then, they would be able to access specific controllers.

Pytest was used for the testing and each endpoint had a test associated to it; by the end of the project, all 16 tests passed.

### Frontend - Days 4-7

<br/>

Once the back end was complete, we split the front end tickets which had been created in Trello. I will discuss the pages which I took ownership of, and I also supported India and Jake with de-bugging the other pages. For styling, we decided to use Bulma due to it being a mobile first framework.

<br/>

**Search home**

The search home page had a search bar, a carousel with all the categories (which had been pre-set before seeding) and 'our favourites'.

Search bar:

When a user types, in the search bar, the state of updateSearch is updated. This state was passed through as props when the users clicked search, as I used a link with a string literal. This could then be used in the search results page.

```js
<form className="search-home-form" onSubmit={handleSubmit}>
  <input className="input" type="text" placeholder="Search Garms" onChange={(e) => updateSearch(e.target.value)} />
  <Link className="button is-primary search-home-button" value="search" to={{
    pathname: `/search-results/${search}`
  }}>Click to search</Link>
</form>
```

<br/>

Categories:

The below is from the fetchFeaturedItems function, which was called in the useEffect when the page rendered. In the seed data, there was at least one item for each of the different categories we wanted to showcase on the app. Therefore, we were able to map over the data and extract each category. The categories variable was then sorted into alphabetical order and iterated over to filter the uniques values, and finally was turned into an array and the state was updated.

This state was used to display each of the categories as a link, in the carousel that was displayed on this page.

```js
const { data } = await axios.get('/api/products')
const categories = data.map(result => {
    return result.category
  })
const uniqueCategories = new Set(categories.sort())
const uniqueCategoriesArray = [...uniqueCategories]
```

<br/>

Our favourites:

Using the data from the above reference axios request, all in stock items were first filtered and then the values in the array were shuffled using a formula and then the first eight values were sliced and added to the featuredItems variable.


```js
    const inStock = data.filter(result => {
      return result.in_stock === true
    })
    const shuffledItems = inStock.sort(() => 0.5 - Math.random()).filter(x => x.user.id !== currentUser)
    const featuredItems = shuffledItems.slice(0, 8)
```    

<br/>

**Search results**

For each filter option for the user, there was a dropdown. Focussing on the gender dropdown here, if the used clicked on the dropdown, the dropdown menu shows with the options (mens, unisex and womens) that the user can filter. This was initied by mapping over the state which was set on page render.

```js
<div className="genderDropdown dropdown">
  <div className="dropdown-trigger">
    <button className="button cat-dropdown" aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => handleGenderButtonClicked()}>
      <span>Gender</span>
      <span className="icon is-small">
        <i className="fas fa-angle-down" aria-hidden="true"></i>
      </span>
    </button>
    {genderIsShown && <div className="dropdown-menu" id="dropdown-menu" role="menu" onMouseLeave={() => handleGenderButtonClicked()}>
      <div className="dropdown-content">
        {gender.map((gender, index) => {
          return <div key={index} className="dropdown-item search-results-dropdown" onClick={() => handleGenderDropdown(gender)}>{gender} ({genderNoOfItems(gender)})</div>
         })}
      </div>
    </div>}
  </div>
</div>
```

In order to handle user selection or if a user decided not to use that filter option (if their mouse travels elsewhere), I had to create various functions for each filter.

handleGenderButtonClicked toggled state and also used DOM manipulation to determine whether the dropdown-menu would be shown or not.

```js
  function handleGenderButtonClicked() {
    if (!genderIsShown) {
      updateGenderIsShown(true)
    } else {
      updateGenderIsShown(false)
    }
    const dropdown = document.querySelector('.genderDropdown')
    dropdown.classList.toggle('is-active')
  }
```
handleGenderDropdown would update the state updateFurtherFilteredResults, which determines what would be displayed on the page. Users can use the different filters simultaneously and there is also a button to clear filters, and return furtherFilteredResults to its original state.

```js
 function handleGenderDropdown(gender) {
    try {
      const filteredGender = furtherFilteredResults.filter(result => {
        return gender === result.gender
      })
      handleGenderButtonClicked()
      updateFurtherFilteredResults(filteredGender)
    } catch (err) {
      console.log(err)
    }
``` 

<br/>

**Single product**

The single product page shows an image of the product, and information about this, including a description, brand, price, size and condition. You can also see the seller's details and a link to their profile page, so you can view other items that they are currently selling.

This page shows different buttons, dependent on whether you were the owner of the listing or not. If you were the owner of the listing, you are able to click buttons to edit or delete the listing.

```js
{product.user && <>
  {loggedInUserId === product.user.id &&
  <>
    {product.in_stock &&
      <>
        <Link to={`/productform/${productId}`} className="button is-primary">Edit</Link>
        <button className="button is-primary" onClick={handleDelete}>Delete</button>
      </>
     }
   </>
  }
</>}
```

If you are not the owner, you can add or remove the listing from your wishlist, dependent on the current state (true/false) of inWishList.

```js
{loggedInUserId !== product.user.id && <>
  {inWishlist ?
    <button className="button" onClick={removeFromWishlist}><i className='fas fa-heart mr-2'></i> Remove From Wishlist</button>
    :
    <button className="button" onClick={handleWishlist}><i className='fas fa-heart mr-2'></i> Add To Wishlist</button>
}
```

The below function would renders a buy now button if the current user is not the owner and if the product is in stock. The button is a link, which takes the user to 'checkout' to buy the item.

```js
function handleInStock() {
    if (loggedInUserId === (product.user && product.user.id)) {
      return
    } else {
      if (product.in_stock === true) {
        return <>
          <Link className="button is-primary" to={{%
            pathname: '/checkout',
            state: {%
              product: product
            %}
          %}}>Buy now</Link>
        </>
      }
    }
  }
```
There is also a button to allow all users to share links of the item on Facebook, which is done by utilising the react-share library.

<br/>

**Dynamic scroll to top**

In the latest version of React, there is no out of the box support for scroll resoration. Therefore I used the below code snippet for the about page and single product page, so that the user will see the top of the new page that renders.

```js
  useEffect(() => {
    if (props.history.action === 'POP') {
      return
    }
    const hash = props.location.hash
    if (hash) {
      const element = document.querySelector(hash)
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' })
      }
    } else {
      window.scrollTo(0, 0)
    }
  })
  return (
    <div />
  )
```

## Conclusion

### Wins

- The project was a great opportunity to learn Python, Flask and using a PostgreSQL database, as this was my first opportunity to do so.
- I am becoming more comfortable with React and trying out new libraries.

### Challenges

- Python and Flask were new technologies for this project, so it took slightly longer than expected to determine the relationships between the tables. However, it was a great learning experience.

### Bugs

- Featured products on search page displays the current user's listed items, which is not great UI. (This has been fixed post-project)
- If you are not logged on, you can manually change the URL and navigate to 'buy' a product - to fix this, I need to check if a user is logged on, before displaying the relevant information on each page.

### Lessons learned

- The search results page has a lot of code that was reused for each search dropdown. I have learnt that I could have created a resuable component to make this code DRY.

### Future development plans

- I would like to add further filtering to the search results page:
  - enable a user to filter by two or more of the dropdown results, e.g. choosing mens and unisex from the gender dropdown.
  - clearing a filter if it is selected and then clicked again. Also highlighting the chosen options on the dropdowns.
- include password confirmation on the registration page
- allow a user to sell more than one of each item, and subsequently show how many of a particular item are available on the single item page.
- front end testing

## The Result

Home

![Home image](/assets/home.png)

<br/>

Search Page

![Search page image](/assets/search-home.png)

<br/>

Search Results

![Search page image](/assets/search-results.png)

<br/>

Single item

![Single item image](/assets/single-item.png)

<br/>

Profile

![Profile page image](/assets/profile.png)

<br/>

Add listing

![Add listing page image](/assets/add-listing.png)

<br/>

Edit listing

![Edit listing page image](/assets/edit-listing.png)