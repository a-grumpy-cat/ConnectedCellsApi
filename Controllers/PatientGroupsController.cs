using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace ConnectedCellsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PatientGroupsController : ControllerBase
    {
        private readonly ILogger<PatientGroupsController> _logger;

        public PatientGroupsController(ILogger<PatientGroupsController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        [Route("calculate")]
        public IActionResult Calculate([FromBody]People matrix) {
            int total_rows = matrix.people.GetLength(0);
            int total_cols = matrix.people[0].Length;

            bool[,] visited = new bool[total_rows, total_cols];
            List<int> clusterSize = new List<int>();
            
            // Iterate through each of the nodes, and call DFS if the node is not visited and the value is 1
            for (int row = 0; row < total_rows; row++)
            {
                for (int col = 0; col < total_cols; col++)
                {
                    if (matrix.people[row][col] == 1 && visited[row, col] == false)
                    {
                        clusterSize.Add(dfs(matrix.people, row, col, visited, total_rows, total_cols));
                    }
                }
            }
            return Ok(new {numberOfGroups = clusterSize.Count});
        }

        private int dfs(int[][] matrix, int row, int col, bool[,] visited, int total_rows, int total_cols)
        {
            int sum = 1;

            visited[row, col] = true;

            // Iterate through each of the node's neighbor
            for(int i = -1; i < 2; i++) {
                for(int j = -1; j < 2; j++) {
                    // boundary conditions
                    if(row+i < 0 || row+i == total_rows || col+j < 0 || col+j == total_cols || (row+i == row && col+j == col) ){
                        continue;
                    }
                    if(!visited[row+i, col+j] && matrix[row+i][col+j] == 1) {
                        sum += dfs(matrix, row + i, col + j, visited, total_rows, total_cols);
                    }
                }
            }

            return sum;
        }
    }    
        
}
