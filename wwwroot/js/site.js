$(function(){
    const colors = ['#FDDFDF', '#FCF7DE', '#DEFDE0', '#DEF3FD', '#F0DEFD']
    var people;
    var visited;

    function reset() {
        $('.card').css('background-color', 'white');
    }

    function showGroups() {
        let dimensions = [ people.length, people[0].length ];
        visited = new Array(dimensions[0]);
        
        for(i=0; i < visited.length; i++) {
            visited[i] = new Array(dimensions[1]);
            visited[i].fill(false);
        }
        let colorIndex = 0;

        for(i=0; i<dimensions[0]; i++) {
            for(j=0; j<dimensions[1]; j++) {
                if(people[i][j] == 1 && visited[i][j] == false) {
                    colorIndex = (colorIndex + 1) % 5;
                    dfs(i, j, dimensions[0], dimensions[1], colorIndex);
                }
            }
        }
    }

    function dfs(r, c, total_rows, total_cols, colorIndex) {
        console.log(visited);
        visited[r][c] = true;
        let cardId = ""+r+c;
        $("#"+cardId).css('background-color', colors[colorIndex]);

        for(a = -1; a < 2; a++) {
            for(b = -1; b < 2; b++) {
                if(r+a < 0 || r+a == total_rows || c+b < 0 || c+b == total_cols || (r+a == r && c+b == c) ){
                    continue;
                }
                if(visited[r+a][c+b] == false && people[r+a][c+b] == 1) {
                    dfs(r + a, c + b, total_rows, total_cols, colorIndex);
                }
            }
        }
    }
        
    function calculate() {
        let jsonPeople = {"people" : people};
        fetch("api/patientgroups/calculate", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonPeople)
          })
        .then(response => response.json())
        .then((data) => {
            $('#group-count-div').css("visibility", "visible");
            $('#group-count').html(data.numberOfGroups);
        })
        .catch(error => console.error('Unable to add item.', error));
    }

    // on apply btn click
    $("#applyBtn").on('click', function(event) {
        event.preventDefault();
        let rows = parseInt($('#matrix-row').val());
        let cols = parseInt($('#matrix-col').val());
        people = new Array(rows);
        for(x = 0; x < rows; x++) {
            people[x] = new Array(cols);
        }
        let col_size = 1;
        switch(Math.floor(12/cols)) {
            case 1:
                col_size = 1;
                break;
            case 2:
                col_size = 2;
                break;
            case 3:
                col_size = 3;
                break;
            case 4:
                col_size = 4;
                break;
            case 6:
                col_size = 6;
                break;
            case 12:
                col_size = 12;
                break;
            default:
                break;
                    
        }

        $('#grid-container').html("");
        $('#group-count-div').css("visibility", "hidden");
        for(i = 0; i < rows; i++){
            $('#grid-container').append('<div class="row g-1" id="grid-row-'+ i + '"></div>')
            for(j = 0; j < cols; j++){
                people[i][j] = 0;
                let grid_row = '#grid-row-' + i;
                $(grid_row).append('\
                    <div class="col-sm-'+ col_size + ' col-xs-'+ col_size + '">\
                        <div class="card h-12" id="'+ i + j +'" row="'+ i + '" col="'+ j +'" value="0" style="padding: 10px; align-items: center">\
                            <i class="fas fa-head-side-mask fa-3x"></i>\
                        </div>\
                    </div>');
            }
        }

        // on clicking the card flip it
        $(".card").on('click', function(event) {
            let element = event.target.nodeName == "I" ? event.target.parentElement : event.target;
            let row = parseInt($(element).attr('row'));
            let col = parseInt($(element).attr('col'));
            if($(element).attr('value') == "0") {
                people[row][col] = 1;
                $(element).attr('value', '1');
                $(element).html('<i class="fas fa-virus fa-3x"></i>');
            }
            else {
                people[row][col] = 0;
                $(element).attr('value', '0');
                $(element).html('<i class="fas fa-head-side-mask fa-3x"></i>');
                   
            }
        });

        $("#calculate-btn").css("visibility", "visible");
    });

    $('#calculate-btn').on('click', function() {
        calculate();
        reset();
        showGroups();
    });

});