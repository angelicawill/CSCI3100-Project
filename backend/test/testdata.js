module.exports = {
    chats: [
        {
            id: 11,
            users: [
                {
                    userid: 1,
                    readedIndex: 0
                },
                {
                    userid: 2,
                    readedIndex: -1
                }
            ],
            msg: [
                {
                    sender: 1,
                    readedUserIds: [1],
                    value: "hi",
                    time: 43857248453
                }
            ]
        },
        {
            id: 12,
            users: [
                {
                    userid: 1,
                    readedIndex: 0
                },
            ],
            msg: [
                {
                    sender: 1,
                    readedUserIds: [1],
                    value: "bye",
                    time: 43857248453
                }
            ]
        }
    ],
    users: [
        {
            userid: 1,  //generated by counting the number of tuples
            realname: "no real name",
            username: "name1",
            phonenumber: 12345678,
            email: "name1@gmail.com",
            role: "student", //indicate the user is a student or tutor
            isVerified: true,
            password: "name1",//should be salted
            roomids: [12, 11]
        },
        {
            userid: 2,  //generated by counting the number of tuples
            realname: "also no real name",
            username: "name2",
            phonenumber: 87654321,
            email: "name2@gmail.com",
            role: "teacher", //indicate the user is a student or tutor
            isVerified: true,
            password: "name2",//should be salted
            roomids: [11]
        },
        {
            userid: 3,  //generated by counting the number of tuples
            realname: "still no real name",
            username: "name3",
            phonenumber: 2345789,
            email: "name3@gmail.com",
            role: "teacher", //indicate the user is a student or tutor
            isVerified: true,
            password: "name3",//should be salted
            roomids: []
        }
    ]
}