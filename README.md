# ConnectedCellsApi

The API exposes an endpoint which gives the number of groups of connected cells in a matrix. 

The matrix consists of either 0 or 1. The cells are said to be connected if their value is 1 and are adjacent to each other in any direction (horizonatally, vertically and diagonally).

<b>Depth First Search (DFS)</b> is used to find out the connected cells. The space/time complexity of the algorithm is:
1. Time complexity : O(row*column) - since each of the cells are visited once
2. Space complexity : O(row*column) - in case all the cells' values are 1


The solution also has a UI for intuitive demonstration of the algorithm.

The entire project is hosted on Azure. To access the web-page go to this URL : https://connectedcellsapi.azurewebsites.net

![alt text](https://github.com/flywithamit/ConnectedCellsApi/blob/master/Screenshot2.jpg)

The URL for the API itself is : https://connectedcellsapi.azurewebsites.net/api/patientgroups/calculate

![alt text](https://github.com/flywithamit/ConnectedCellsApi/blob/master/Screenshot1.jpg)

Thanks.
