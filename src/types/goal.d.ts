export default interface Goal {
  hours: number;
  status: "completed" | "in-progress" | "not-started";
  createdOn: Date;
  dueDate: Date;
}
