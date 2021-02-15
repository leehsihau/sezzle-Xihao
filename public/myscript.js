function dis(val) {
    document.getElementById("result").value += val
}

function solve() {
    let x = document.getElementById("result").value
    let y = eval(x)
    document.getElementById("result").value = y
    database.ref('/history/').push({
        res: x + "=" + y
    });
}

$(document).ready(() => {
    $('#clearButton').click(() => {
        $("#result")[0].value = "";

    })
});


function loadCalculations() {
    const dataList = new Array(0);
    var callback = (snap) => {
        var data = snap.val()['res'];
        if (dataList.length >= 10) {
            dataList.pop();
        }
        dataList.unshift(data);

        console.log(data + "\n");
        $(document).ready(() => {
            //$("#messages-card")[0].append(dataList[0])
            if ($("#messages-card")[0].childElementCount >= 10) {
                $("#messages-card")[0].removeChild($("#messages-card")[0].lastChild)
            }
            $("#messages-card")[0].insertAdjacentHTML('afterbegin', '<div class="visible" <p3>' + data + '</p3></div>');
        });
    };

    firebase.database().ref('/history/').limitToLast(10).on('child_added', callback);
    firebase.database().ref('/history/').limitToLast(10).on('child_changed', callback);

}

loadCalculations()