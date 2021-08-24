$("#dashboard-attendance").click(function (e) {
  console.log(e);
  $("#clock-in-button").trigger("click");
  $("#clock-out-button").trigger("click");
});

// attendace chart
const userId = $("#student_id").text();
console.log(userId);
const today = new Date();
const weekBefore = today.setDate(today.getDate() - 7);
const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";


axios.get("/api/attendance/getAllRecords/" + userId, { params: { startDate: weekBefore } }).then(function (response) {
  console.log(response);
  let attendData = {};

  response.data.forEach(function (attend) {
  


    const start = new Date(attend.start);
    const end = new Date(attend.end?attend.end:Date());

    if (attendData[start.getDate() + "/" + start.getMonth() + "/" + start.getFullYear()]) {
      attendData[start.getDate() + "/" + start.getMonth() + "/" + start.getFullYear()] += Math.floor(((end.getTime() - start.getTime()) / (1000 * 60)) * 100) / 100;
  

    } else {
      attendData[start.getDate() + "/" + start.getMonth() + "/" + start.getFullYear()] = Math.floor(((end.getTime() - start.getTime()) / (1000 * 60)) * 100) / 100;
        
    }
  });
  let chartLabels = [];
  let chartData = [];
  for (day in attendData) {
    chartLabels.push(day);
    chartData.push(attendData[day]);
  }

  var ctx = document.getElementById("myChart").getContext("2d");
  var myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: chartLabels,
      datasets: [
        {
          label: "# of minutes",
          data: chartData,
          backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(75, 192, 192, 0.2)", "rgba(153, 102, 255, 0.2)", "rgba(255, 159, 64, 0.2)"],
          borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)", "rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)", "rgba(255, 159, 64, 1)"],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
