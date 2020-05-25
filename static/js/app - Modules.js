// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
// tel JS to look for tag <tbody> in the html
var tbody = d3.select("tbody");

// build Table function:
function buildTable(data) {
    // clear existing data in the table:
    tbody.html(""); //tbody from d3 above, then assign value as ""

    // forEach function: loop through the data Array/List
    data.forEach( (dataRow) => {
        
        // first, add a new row (tr) for html table
        let row = tbody.append("tr");   

        // getting new table data (td, or table cell) for the current row
        // we are in a dict from the data Array; loop through the values (or objects) in that dict and get the value out:
        Object.values(dataRow).forEach((val) => {
            // add new cells to the current row:
            let cell = row.append("td");
            // then return the value to that cell
            cell.html(val)
            });
    });
}

// Function handleClick():
function handleClick() {
    // select the first tag with the id name as "datetime", and get its value:
    // # for id name, . for class name
    let date = d3.select("#datetime").property("value");

    //default filter (no filter at all):
    let filteredData = tableData;

    //if a date is entered, Filter the default data to show only the date entered:
    if (date) {
        // check each key 'datetime' in the tableData === date
        // 'row' here represents each dict in the Array list --> row.datetime: get the value of the key 'datetime'
        filteredData = filteredData.filter(row => row.datetime === date);
    };

    // Rebuild the table using the filtered data
    // @NOTE: If no date was entered, then filteredData will just be the original tableData.
    buildTable(filteredData);
}

// Listen for a click event:
// select the first tag with the id name as "filter-btn"; execute the handleClick function when it's clicked (on 'Click')
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the default table right when the page loads
buildTable(tableData);