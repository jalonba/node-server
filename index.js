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
  console.log("Esta es la ista de tareas:");
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

async function main() {
  let option = "";
  while (option !== "0") {
    showMenu();
    option = await readOption();

    switch (option) {
      case "1":
        const { indicador, descripcion } = await promptNewTask();
        addTask(indicador, descripcion, "incompleta");
        console.log("Tarea agregada correctamente.");
        break;
      case "2":
        const indicadorEliminar = await promptTaskIndicator();
        removeTask(indicadorEliminar);
        console.log("Tarea eliminada correctamente.");
        break;
      case "3":
        const indicadorCompletar = await promptCompleteTaskIndicator();
        completeTask(indicadorCompletar);
        console.log("Tarea completada correctamente.");
        break;
      case "4":
        listTasks();
        break;
      case "0":
        console.log("Saliendo del programa...");
        break;
      default:
        console.log(
          "Opción inválida. Por favor, seleccione una opción válida."
        );
        break;
    }
  }

  rl.close();
}

main();
