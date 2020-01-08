[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/PeterKellett/project-2) 

# Code Institute

Welcome PeterKellett,

We have preinstalled all of the tools you need to get started.

Happy coding!

#Peter Kellett - Milestone Project 2

##Introduction
The basis of this project is to demonstrate my ability in the use of JavaScript and jQuery.

##Project Scope
The use of this project is to compile the data of an underage soccer team. This data will then be used to construct dynamic charting of some key statistics of the players/team

##Wireframes
###Home Page
https://res.cloudinary.com/dfboxofas/image/upload/v1578494633/Project%202/Project_2_Home_Page_Wireframe_sk69rm.png
###Input Form Page
https://res.cloudinary.com/dfboxofas/image/upload/v1578494638/Project%202/Project_2_Form_page_wireframe_godbml.png

## Home Page
This is where the dynamic charting takes place. The charting dynamics uses the following libraries.
- d3.min.js version 3.5.17
- crossfilter.min.js version 1.3.12
- dc.js version 2.1.8

##Charts rendered
###Match Attendance Start/Sub: Stacked Bar Chart
This chart is a stacked bar chart showing the amount of games played per player and is split between the number of games each player started and the number of games that the respective player was a substitute. 
- X-axis: Player Name
- Y-axis: Number of matches (Started/Substitute/Total)

###Total Goals/Assists per Opponent: Stacked Bar Chart
This chart is a stacked bar chart showing the number of Goals and assists that the team has scored versus each respective opponent.
- X-axis: Opponent Name
- Y-axis: Number of Goals/Assists

###Total Goals/Assists per Player: Stacked Bar Chart
This chart is a stacked bar chart showing the total number of Goals and assists that each Player has scored.
- X-axis: Player Name
- Y-axis: Number of Goals/Assists

###Player Ratings Chart: Composite Line Graph
This chart plots each players rating per match played.
- X-axis: Date
- Y-axis: Numeric 0-10 scale

###Goals per Player: Pie Chart
This pie chart shows the percentage of goals scored per player against the total number of goals scored by the team.

###Assists per Player: Pie Chart
This pie chart shows the percentage of assists per player against the total number of assists by the team.

##Data used for chart rendering
The data used for rendering the charts is stored in JSON format. The value object pairs are:
- "date": "", 
- "name": "", 
- "squad": 0/1, 
- "opponent": "", 
- "goals": , 
- "assists": , 
- "rating": ,


##Form Page
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
