[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/PeterKellett/project-2) 

# Peter Kellett - Milestone Project 2

## Introduction
This project is my milestone 2 project whilst studying the Full Stack Web Development program with Code Institute.
The basis of this project is to demonstrate my ability in the use of JavaScript and jQuery while upholding the previous learnt practices in the use of html and css.

## Project Scope
For this project the statistics of an underage soccer team will be used to construct a web page dashboard displaying charts showing the individual and collective data of the team.

The main functionality of crossfiltering the data and rendering the charts will be achieved using the source libraries of Crossfilter and dc charting. Crossfilter gives a fast multidimensional filtering tool for rendering groups and values of complex data based on user input. dc.js provides the tools for compiling the chart objects based on the filters applied to crossfilter. d3.js is the library used to bind the chart objects to the html structure using the DOM. 

## Source libraries used
#### d3.js 
- Version used: d3/5.15.1/d3.min.js 

#### Crossfilter.js 
- Version used: crossfilter/1.3.12/crossfilter.min.js  

#### dc.js
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

## Features  
### Drop down filter menu's  
There are 2 drop down filter menu's positioned above the charts for the user to select stats by the player name or by the opponent name.  

#### Player name dropdown select menu  
- This uses the player name as the dimension and is grouped by name.  

#### Opponent name dropdown select menu
- This uses the opponent name as the dimension and is grouped by opponent name.  

### Data count  
The data count gives the user an indication of how much of the data is selected based on the current filter settings the user is on. It gives the user the number of rows of data selected out of the total number of rows of data.  

### Reset all button  
The reset all button resets all filters previously selected by the user.  

### Charts  
The user has the option to apply filters by clicking on any coloured section of any of the graphs. all other charts instantly rerender filtering all the other charts in relation to the section clicked.  

### Data table  
To add to the UX, a table displaying the rows of data available by the filters applied is displayed. This will aid the user and provides a means of cross-referencing the values shown in each chart.

### Screenshot
- Main page: https://res.cloudinary.com/dfboxofas/image/upload/v1588252727/Project%202/Home_screenshot_zrkfha.jpg  

## Data Type - JSON name:value pairs
The data used for rendering the charts is stored in JSON format. The value object pairs are:
- "date": "", 
- "name": "", 
- "start": 0/1, 
- "opponent": "", 
- "goals": , 
- "assists": , 
- "rating": ,

## Functionality  
#### Chart 1 - Match Attendance Start/Sub  
This is achieved by creating a name dimension and grouping and reducing the sum of the number of [squad = 1] totals for each player into a single value. This gives the number of starts for each player.  
The stacked portion is achieved by taking the same name dimension and grouping and reducing the sum of the number of [squad = 0] totals for each player into a single value. This gives the number of subs for each player.  

#### Chart 2 - Ratings Chart  
This is a composite line chart and is acheived by taking the date dimension, and for each name on each date, calling a function which returns the given rating for that player. 

#### Chart 3 - Total Goals/Assists Per Person
This is acheived by creating a name dimension and grouping and reducing the sum of the number goals for each player into a single value. This gives the number of goals for each player.  
The stacked portion is achieved by taking the same name dimension and grouping and reducing the sum of the number of assists for each player into a single value. This gives the number of assists for each player.

#### Chart 4 - Total Goals/Assists Per Opponent  
This is acheived by creating an opponent dimension and grouping and reducing the sum of the number of goals against each opponent into a single value. 
The stacked portion is achieved by taking the same opponent dimension and grouping and reducing the sum of assists against each opponent into a single value.  

#### Chart 5 - Total Assists Per Person  
This is acheived by creating a name dimension and grouping and reducing the sum of the number assists for each player into a single value. This gives the number of assists for each player. 
The slice size is then proportionally calculated based on the total number available by way of the applied filter. 

#### Chart 5 - Total Goals Per Person  
This is acheived by creating a name dimension and grouping and reducing the sum of the number goals for each player into a single value. This gives the number of goals for each player. 
The slice size is then proportionally calculated based on the total number available by way of the applied filter. 

#### Chart 6 - Total Assists per Opponent  
This is acheived by creating an opponent dimension and grouping and reducing the sum of the number assists for each opponent into a single value. This gives the number of assists against each opponent. 
The slice size is then proportionally calculated based on the total number available by way of the applied filter. 

#### Chart 6 - Total Goals Per Opponent  
This is acheived by creating an opponent dimension and grouping and reducing the sum of the number goals against each opponent into a single value. This gives the number of goals against each opponent. 
The slice size is then proportionally calculated based on the total number available by way of the applied filter.  

#### Data Table  
The data table uses the date as the dimension dimension. The data is the sectioned by opponent and the columns displayed are Name, Start/Sub, Goals, Assists, Rating.

## Testing  
### Unit testing
Unit testing was applied by first rendering the charts on a stand alone basis. This tests the d3 application if the chart renders via the DOM. It also tests that the chart dimension and grouping are correct if the axis data type is correct. 

### Integration testing
After unit testing is deemed successful, ie the chart renders successfully on a stand alone basis, the chart is then integrated to the main page and testing can now be carried out on the crossfilter functionality.  

## Tests
#### 1) Player name select menu test  
1) Click on drop down menu to reveal player names.
2) Click on player name #1 
3) Verify all charts re-render displaying only the chosen players stats.
4) Verify the data table only displays rows of the chosen player name.
5) Verify the number in the data-count widget corresponds to the number of rows in the data table.
6) Click on 'Select all' in player name drop down menu.
7) Verify all charts re-render showing filter has been removed.
8) Repeat steps 1-7 for each player name in the list.  

#### 2) Opponent name Select menu test  
1) Click on drop down menu to reveal opponent names.
2) Click on opponent name #1 
3) Verify all charts re-render displaying only the chosen opponents stats.
4) Verify the data table only displays rows of the chosen opponent name.
5) Verify the number in the data-count widget corresponds to the number of rows in the data table.
6) Click on 'Select all' in opponent name drop down menu.
7) Verify all charts re-render showing filter has been removed.
8) Repeat steps 1-7 for each opponent name in the list.  

#### 3) Filtering by chart sections test  
1) Click on a section of the chart.  
2) Verify the chart re-filters on chosen section.
3) Verify all other charts and data table re-render with the same filter applied.  
4) Verify the chosen filter name appears above the respective chart in accompaniment with a reset button.
5) Click on another chart section of chart under test.
6) Verify all other charts and data table re-render with the new filter added.  
7) Repeat steps 5 and 6 for each section available.
8) Click reset button to finish.
9) Verify all charts and data table re-render with no filters applied.
10) Repeat for each chart.  

## Bugs and fixes
I encountered 2 main bugs while developing this site and each required a workaround in order to fix.
1) #### Not all charts were crossfiltering correctly.
    I had a problem where only some of the charts, notably chart 1 and 2, would not apply the filters set by another chart. It was failing the 'Filtering by chart sections test'. After checking and rechecking my code, the documentation and reaching out on Slack, I turned to Tutor Support and had to be provided with a hot fix as a workaround. My understanding for this reason was that a dimension could not be called on more than once so if a dimension is required for subsequent charts it needs to be renamed uniquely. As several of my charts use the 'name dimension' and 'opponent dimension' I have had to declare and name them respectively.  

2) #### Reset buttons would not function.  
    The reset buttons which appear within each chart would not function. I'm not sure of the reason for this but in trying to introduce an onClick event for each button I discovered that the reset buttons would work when the code was in script tags in the html file rather than a separate .js file. This was my fix for the bug so I took no further action.

## Deployment  
This project is hosted with GitHub.

#### Deployment procedure  
1) Create a new upstream branch or raise an issue in GitHub.
2) Open this branch or issue in code editor. For this project GitPod was used.
3) Add and commit code to this branch until satisfied code can be merged with the main branch.
4) Send a pull request to GitHub requesting the branch can be merged.
5) If there are no conflicts raised this branch or issue can then be closed by performing a merge onto the main branch. A merge can also be performed from GitPod.

## References  
#### d3.js 
- https://d3js.org/#introduction 
- https://github.com/d3/d3/blob/master/CHANGES.md#changes-in-d3-50  

#### Crossfilter.js 
- https://github.com/crossfilter/crossfilter/wiki/API-Reference  
- http://crossfilter.github.io/crossfilter/  

#### dc.js  
- https://dc-js.github.io/dc.js/
- https://dc-js.github.io/dc.js/docs/stock.html  
- https://dc-js.github.io/dc.js/docs/html/index.html  
- https://dc-js.github.io/dc.js/examples/  

#### Bootstrap  
- https://getbootstrap.com/docs/4.0/getting-started/introduction/  

## Learning Outcomes
I had several new aspects to overcome while doing this project.
1) #### Transition from Cloud9 to GitPod code editor. 
    Although this was difficult to start with no further difficulties were encountered and I'm quite comfortable with using it now.
2) #### The importance of using current versions of source files.
    I started this project using the Code Institute tutorials and was working fine but I quickly encountered bugs and errors when I tried to expand on my code using referenced documentation. When I updated and used the newest versions I found my original code was now not valid and was throwing console errors. This was a good learning curve as it made me have to closely inspect and understand the documentation in order to adapt my existing code correctly.  
3) #### Debugging and troubleshooting  
    I gained knowledge in the use of using breakpoints in the debug tool and also of logging values and object types to the console in order to ascertain if my dimensions and grouping were being correctly applied.  

## Acknowledgements  
I wish to acknowledge the following for their advice and input to this project.  
- Rahul Patil for his mentoring advice  
- Code Institute Tutor Support for their help with bug fixes.

