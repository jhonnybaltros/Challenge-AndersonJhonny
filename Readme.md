1. # Intro

 In this project, I decided to take a visual approach, very focused on a “map” visual. And my intention was to display all the information needed in the map, without having to use  unnecessary elements in the design. 

2. # Technologies

I wanted to use styled-components, but I got a little concerned about breaking the rule that talked about not using any framework. It made me wonder if the styled-components would fit as a CSS preprocessor, so I decided to use just pure CSS. Along with CSS, I used React and that was it. 
React features used in the project was: 

* useEffect — for managing information sent from search bar to google APIs
* useLayoutEffect — for first render management  and to initiate JavaScript Google Maps and prevent it to be reloaded unnecessary, to trigger the function that get the user geolocation through Google Geolocation API
* useRef — to update geolocations without triggering the re-render of JavaScript Map
* useState — to manage state changes in the application

3. # Mistakes

* Time management — I think that I could have been more cautious about how much time I was spending in things that was not that important. Because of that, I could not invest the correct amount of time in the front design (buttons, cards etc.)
* Delay in deciding what my approach would be — Because of that much of the features that are indispensables I couldn’t implement yet
* Clean code — another side effect of the time management was not to have time to refactor my code and to use CSS pre-processors.


4. # Improvements

There are several improvements that I want to make. One of them is to fix an issue with the map not be correctly centered after a new location loading. I want to work some more in the UI of the project and create beautiful components to display the weather information, to improve the code cleanliness.
I want to study of a way of search with typing delay, instead of use onBlur in the search bar component, like typing a city name and after a while (2 or 3 secs) to do the search
To handle what would happen when a user type an invalid city name.