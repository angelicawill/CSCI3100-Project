export type Chats = Chat[];

export type Chat = {
  id: Number;
  users: CaseUser[];
  msg: Msg[];
};

export type CaseUser = {
  userid: Number;
  readedIndex: Number;
};

export type Msg = {
  sender: Number;
  readedUserIds: Number[];
  value: String;
  time: Number;
};

export type Users = User[];

export type User = {
  userid: Number; //generated by counting the number of tuples
  realname: String;
  username: String;
  phonenumber: Number;
  email: String;
  role: "student" | "tutor"; //indicate the user is a student or tutor
  isVerified: Boolean;
  password: String; //should be salted
  roomids: Number[];
};

export type Cases = Case[];

export type Case = {
  caseid: Number;
  studentids: Number[];
  invitingStudentid: Number[];
  tutorid: Number;
  createAt: Number;
  isClosed: Boolean;
};
