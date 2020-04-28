[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/PeterKellett/project-2) 

# Peter Kellett - Milestone Project 2

## Introduction
This project is my milestone 2 project whilst studying the Full Stack Web Development program with Code Institute.
The basis of this project is to demonstrate my ability in the use of JavaScript and jQuery while upholding the previous learnt practices in the use of html and css.

## Project Scope
For this project the statistics of an underage soccer team will be used to construct a web page dashboard displaying charts showing the individual and collective data of the team.

The main functionality of crossfiltering the data and rendering the charts will be achieved using the source libraries of Crossfilter and dc charting. Crossfilter gives a fast multidimensional filtering tool for rendering groups and values of complex data based on user input. dc.js provides the tools for compiling the charts based on the filters applied to crossfilter. d3.js is the library used to render the chart objects to the html structure using the DOM. 

## Source libraries used
#### d3.js 
This library is required for placing the Chart objects into the html structure using the DOM.
- Version used: d3/5.15.1/d3.min.js  


#### Crossfilter.js 
This library does the main load handling of the data as it gives the user a fast multidimensional filtering functionality.  
- Version used: crossfilter/1.3.12/crossfilter.min.js  


#### dc.js
This library is used to construct and render the respective charts as filtering the crossfilter dataset occurs.  
- Version used: dc/3.2.1/dc.min.js  


Other source files used were:  
#### Bootstrap JavaScript libraries  
- Version used: jquery-3.3.1.slim.min.js
- Version used: popper.js/1.14.7
- Version used: bootstrap/4.3.1/js/bootstrap.min.js

#### Bootstrap CSS library  
- Version used: bootstrap/4.4.1/css/bootstrap.min.css

#### dc CSS  
- Version used: dc/2.1.8/dc.min.css

#### AJAX
- Version used: ajax/libs/dc/3.2.1/dc.min.js

## UX 
1) The User Experience (UX) for this project is for the user to see a nicely laid out dashboard comprising of several charts showing the collective data for each player and for each opponent played.  
The charts displayed are:
    #### Chart 1 - Match Attendance Start/Sub  
    - Type: Stacked bar chart  
    - X-Axis: Player name  
    - Y-Axis: Number of matches each player has started  
    - Stacked Y-Axis: Number of matches each player was sub

    #### Chart 2 - Ratings Chart  
    - Type: Composite line chart
    - X-Axis: Date  
    - Y-Axis: Player rating  

    #### Chart 3 - Total Goals/Assists Per Person
    - Type: Stacked bar chart  
    - X-Axis: Player name  
    - Y-Axis: Number of goals each player has scored  
    - Stacked Y-Axis: Number of assists each player has made  

    #### Chart 4 - Total Goals/Assists Per Opponent  
    - Type: Stacked bar chart  
    - X-Axis: Opponent name  
    - Y-Axis: Number of goals each player has scored against each opponent 
    - Stacked Y-Axis: Number of assists each player has made  against each opponent  

    #### Chart 5 - Total Assists and Goals Per Person  
    - Type: Pie charts
    - Segment: Player name  
    - Assists pie chart slice size: Total number of assists each player has made  
    - Goals pie chart slice size: Total number of goals each player has made  

    #### Chart 6 - Total Assists and Goals per Opponent  
    - Type: Pie charts
    - Segment: Opponent name  
    - Assists pie chart slice size: Total number of assists made against each opponent
    - Goals pie chart slice size:  Total number of goals made against each opponent
  
2) A User should have suitable menu style buttons for filtering accordinging to either player name or opponent or both.  
3) All charts should filter and re-render when a user interacts with any chart by clicking on any section of data displayed.
4) A user requires the ability to reset all filters without having to do a browser refresh.
5) A table displaying the rows of data based on filters applied by the user is compiled to add further ux to allow the user to cross-reference values obtained in the charts.

## Wireframes
### Home Page
https://res.cloudinary.com/dfboxofas/image/upload/v1578494633/Project%202/Project_2_Home_Page_Wireframe_sk69rm.png
### Input Form Page
https://res.cloudinary.com/dfboxofas/image/upload/v1578494638/Project%202/Project_2_Form_page_wireframe_godbml.png

## Home Page
This is where the dynamic charting takes place. The charting dynamics uses the following libraries.

## Data used for chart rendering
The data used for rendering the charts is stored in JSON format. The value object pairs are:
- "date": "", 
- "name": "", 
- "squad": 0/1, 
- "opponent": "", 
- "goals": , 
- "assists": , 
- "rating": ,


## Form Page
This page is used by the team administrator to input new data to the chartData.JSON file. A HTML form is used to input the relevant data required.
The fields required are:
- Date: A jQuery date picker widget is used for this using the following link snippets.
  - <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
	- <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
	- <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
- Opposition: This is a freetype text field for the user to input the opponent team name.
- Player list: This player list auto compiles with the form fields set as readonly. This player list is saved seperately in a players.json file. 3 extra fields are automatically displayed adjacent to each player name for the user to input the number of Goals/Assists/Rating for each player to the chartData.json file.
- Goals Field: This is a numerical only field for the user to input the number of goals scored by the respective player.
- Assists field: This is a numerical only field for the user to input the number of assists by the respective player.
- Rating field: This is a numerical only field for the user to input the match rating assigned to the respective player.


## Learning Outcomes
...........