//插入行
function addRow() {
  var table = document.getElementById("table");
  var length = table.rows.length;
  //console.log(length);
  //插入行节点
  var newRow = table.insertRow(length);

  //插入列结点
  var col1 = newRow.insertCell(0);
  var col2 = newRow.insertCell(1);
  var col3 = newRow.insertCell(2);

  //修改结点文本内容
  col1.innerText = "man";
  col2.innerText = "8";
  col3.innerHTML = "<button onclick='editRow(this)'>编辑</button><button onclick='deleteRow(this)'>删除</button>";
}

//删除行
function deleteRow(button) {
  //console.log(button);
  //获取按钮的父节点的父节点
  var row = button.parentNode.parentNode;

  //获取行结点的父结点，调用其删除孩子函数
  row.parentNode.removeChild(row);
}

//编辑数据函数
function editRow(button) {
  var row = button.parentNode.parentNode;
  var name = row.cells[0];
  var id = row.cells[1];

  var inputName = prompt("输入姓名");
  var inputId = prompt("输入ID");

  name.innerHTML = inputName;
  id.innerHTML = inputId;
}