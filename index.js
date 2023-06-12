const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const tasks = [];

function addTask(indicador, descripcion, estado) {
  tasks.push({ indicador, descripcion, estado });
}

function removeTask(indicador) {
  const index = tasks.findIndex((task) => task.indicador === indicador);
  if (index !== -1) {
    tasks.splice(index, 1);
  }
}

function completeTask(indicador) {
  const task = tasks.find((task) => task.indicador === indicador);
  if (task) {
    task.estado = "completada";
  }
}

function listTasks() {
  console.log("Esta es la lista de tareas:");
  tasks.forEach((task) => {
    console.log(`Indicador: ${task.indicador}`);
    console.log(`Descripción: ${task.descripcion}`);
    console.log(`Estado: ${task.estado}`);
    console.log("----");
  });
}

function showMenu() {
  console.log("Seleccione una opción:");
  console.log("1. Agregar tarea");
  console.log("2. Eliminar tarea");
  console.log("3. Completar tarea");
  console.log("4. Listar tareas");
  console.log("0. Salir");
}

function readOption() {
  return new Promise((resolve) => {
    rl.question("Opción seleccionada: ", (answer) => {
      resolve(answer);
    });
  });
}

function promptNewTask() {
  return new Promise((resolve) => {
    rl.question("Indicador de la tarea: ", (indicador) => {
      rl.question("Descripción de la tarea: ", (descripcion) => {
        resolve({ indicador, descripcion });
      });
    });
  });
}

function promptTaskIndicator() {
  return new Promise((resolve) => {
    rl.question("Indicador de la tarea a eliminar: ", (indicador) => {
      resolve(indicador);
    });
  });
}

function promptCompleteTaskIndicator() {
  return new Promise((resolve) => {
    rl.question("Indicador de la tarea a completar: ", (indicador) => {
      resolve(indicador);
    });
  });
}

function main() {
  showMenu();
  readOption().then(function handleOption(option) {
    switch (option) {
      case "1":
        promptNewTask().then(function handleNewTask({
          indicador,
          descripcion,
        }) {
          addTask(indicador, descripcion, "incompleta");
          console.log("Tarea agregada correctamente.");
          main();
        });
        break;
      case "2":
        promptTaskIndicator().then(function handleTaskIndicator(
          indicadorEliminar
        ) {
          removeTask(indicadorEliminar);
          console.log("Tarea eliminada correctamente.");
          main();
        });
        break;
      case "3":
        promptCompleteTaskIndicator().then(function handleCompleteTaskIndicator(
          indicadorCompletar
        ) {
          completeTask(indicadorCompletar);
          console.log("Tarea completada correctamente.");
          main();
        });
        break;
      case "4":
        listTasks();
        main();
        break;
      case "0":
        console.log("Saliendo del programa...");
        rl.close();
        break;
      default:
        console.log(
          "Opción inválida. Por favor, seleccione una opción válida."
        );
        main();
        break;
    }
  });
}

main();
