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
            cell.text(val)
            });
    });
}


// Keep track of all filters
var filters = {};

// This function will replace your handleClick function
function updateFilters() {

    // Save the element, value, and id of the filter that was changed
    let id =  d3.select(this).attr("id");
    let val = d3.select(this).property("value");
    
    // If a filter value was entered then add that filterId and value
    // to the filters list. Otherwise, clear that filter value from the filters object
    if (val != "") {filters[`${id}`] = val} else {filters[`${id}`] = ""};
  
    // Call function to apply all filters and rebuild the table
    filterTable(filters);
  }
  
function filterTable() {
  
    // Set the filteredData to the tableData
    let filteredData = tableData;

    // Loop through all of the filters and keep any data that
    // matches the filter values
    Object.entries(filters).forEach( ([key,pair]) => {
        if (pair) { filteredData = filteredData.filter(row => row[`${key}`] === pair); }
    } );

    // Finally, rebuild the table using the filtered Data
    buildTable(filteredData);
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

// Attach an event to listen for changes to each filter
// Hint: You'll need to select the event and what it is listening for within each set of parenthesis
d3.selectAll("#datetime").on("change", updateFilters);
d3.selectAll("#city").on("change", updateFilters);
d3.selectAll("#state").on("change", updateFilters);
d3.selectAll("#country").on("change", updateFilters);
d3.selectAll("#shape").on("change", updateFilters);

// Build the default table right when the page loads
buildTable(tableData);