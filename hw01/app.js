const columns    = ['序號', '班級', '學號', '姓名', 'GitHub', '作業一', '作業二', '作業三', '作業四', '作業五', '作業六', '作業七', '作業八',	'作業九',	'作業十'];
const classes    = ['資工系', '資工所', '電資資安', '電資AI', '創新AI'];
const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';


function generate_class() {
    return classes[parseInt(Math.random() * classes.length)]; 
}

function generate_id() {
    const years   = ["111", "112"];
    const classes = ["590", "598", "C52", "C53", "C71"];

    const id_1 = years[Math.floor(Math.random() * years.length)];
    const id_2 = classes[Math.floor(Math.random() * classes.length)];
    const id_3 = (Math.floor(Math.random() * 999) + 1).toString().padStart(3, '0');


    return id_1 + id_2 + id_3;
}

function generate_user() {
    let user = '';

    for (let i = 0; i < 10; i++) {
        const random_index = Math.floor(Math.random() * characters.length);
        user += characters.charAt(random_index);
    }

    
    return user;
}

function generate_score_list() {
    const score_list = [];

    for (let i = 0; i < 10; i++) {
        score_list.push(Math.floor(Math.random() * 10));
    }
    
    
    return score_list;
}

function generate_dummy_csv() {
    let div_element = document.getElementById("dummy-csv-table");
    let table       = document.createElement("table");
  
    let header     = table.createTHead();
    let header_row = header.insertRow();
  
    for (let i = 0; i < columns.length; i++) {
        header_row.insertCell().innerHTML = columns[i];
    }
  
    for (let index = 1; index <= 120; index++) {
        let row = table.insertRow();

        let class_name   = generate_class();
        let studen_id    = generate_id();
        let student_name = "User";
        let github_id    = generate_user();
        let score_list   = generate_score_list();
    
        let row_object = [index, class_name, studen_id, student_name, github_id];
  
        for (let j = 0; j < row_object.length; j++) {
            var cell = row.insertCell();
            cell.innerHTML = row_object[j];
        }
        for (let j = 0; j < score_list.length; j++) {
            var cell = row.insertCell();
            cell.innerHTML = score_list[j];
        }
    } 
  
    div_element.appendChild(table);
}

function generate_apple_scoreboard() {
    let div_element = document.getElementById("apple-scoreboard-table");
    let table       = document.createElement("table");
  
    let header     = table.createTHead();
    let header_row = header.insertRow();
  
    for (let i = 0; i < columns.length; i++) {
        header_row.insertCell().innerHTML = columns[i];
    }
  
    for (let index = 1; index <= 120; index++) {
        let row = table.insertRow();

        let class_name   = generate_class();
        let studen_id    = generate_id();
        let student_name = "User";
        let github_id    = generate_user();
        let score_list   = generate_score_list();
  
        let row_object = [index, class_name, studen_id, student_name, github_id];
  
        for (let j = 0; j < row_object.length; j++) {
            var cell = row.insertCell();
            cell.innerHTML = row_object[j];
        }

        for (let j = 0; j < score_list.length; j++) {
            var cell = row.insertCell();
            cell.innerHTML = `<img src='../score/${score_list[j]}.svg' width='40' height='40'>`;
        }
    } 
  
    div_element.appendChild(table);
  }