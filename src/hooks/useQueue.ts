export interface Task {
  (): Promise<void>;
}
export default function useQueue(parallel: number = 2) {
  let parallelNumber = Math.min(parallel, 6);
  const queue: Array<Task> = [];
  let run = 0;
  const addTask = (task: Task) => {
    queue.push(task);
    costTask();
  };
  const costTask = () => {
    if (run < parallelNumber && queue.length) {
      const toRun = queue.shift()!;
      run++;
      toRun().then(() => {
        run--;
        costTask();
      });
    }
  };
  return {
    addTask,
  };
}
