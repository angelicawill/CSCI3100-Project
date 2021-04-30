//handling db connections
const config = require("./config.json")
const mongoose = require("mongoose");

const dbUri = config.dburiLocal;
//testing with chai
const chai = require('chai');
chai.use(require('chai-as-promised'));

const assert = require('chai').assert
const expect = require("chai").expect



//function to test
const user = require("../user")
const student = require("../student")
const tutor = require("../tutor")
const cases = require("../case")
const {getStudentData,getTutorData} = require("../userGetter")
const fakeData = require("./test_data/fakeuser_new.json")

//handlers
const {initDB,dropAll, deleteAllDoc,deleteMock,startMultipleRequestToTutor,
  initFakeStudentData,initFakeTutorData} = require("./db_init/dbHandler");

describe("Testing functions in tutor.js",()=>{
  const sid = 1
  let tid = 3
  before("connnect to db and add test data ",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  
    
  })
  after("remove all documents",async ()=>{
    await deleteAllDoc()
    mongoose.disconnect()
  })

  beforeEach("insert new set of test data",async ()=>{
    //insert document here
    await initDB(30)
  })

  afterEach("remove all documents",async ()=>{
  await deleteAllDoc()
  })

  describe("Test gettutorData()",()=>{

    it("should return a tutor with existing tutorid",async()=>{
      assert.equal((await getTutorData(tid))["tutorid"],3)

    })
    it("should throw error with non-existing tutor",async()=>{
      await expect(getTutorData(999)).to.be.eventually.rejectedWith(Error)
    })
  })

  describe("Test setTutorData()",()=>{
    let t
    it("should successfully insert 1 type of info",async()=>{
      await tutor.setTutorData(tid,{subjectsTeach:["Subj1"]})
      t = await getTutorData(tid)
      assert.deepEqual(t["subjectsTeach"],["Subj1"])
    })
    it("should be false if inserting to a tutor not exist",async()=>{
      assert.isFalse(await tutor.setTutorData(6000,{subjectsTeach:["Subj1"]}))
    })
    it("should successuflly insert multiple types of info",async()=>{
      const fields = {subjectsTeach:["Subj1"],freeTime:[[10,15],[30,40]]}
      await tutor.setTutorData(tid,fields)
      t = await getTutorData(tid)
      assert.deepEqual(t["subjectsTeach"],fields["subjectsTeach"])
      assert.deepEqual(t["freeTime"],fields["freeTime"])
    })
    it("should successfully alter existing info",async()=>{
      const fields = {subjectsTeach:["Subj1"],freeTime:[[10,15],[30,40]]}
      await tutor.setTutorData(tid,fields)
      const newFields = {subjectsTeach:["Subj2","Subj3"],freeTime:[[1,2]]}
      await tutor.setTutorData(tid,newFields)
      t = await getTutorData(tid)
      assert.deepEqual(t["subjectsTeach"],newFields["subjectsTeach"])
      assert.deepEqual(t["freeTime"],newFields["freeTime"])
    })
    it("should throw error on altering field thats not allow to alter",async()=>{
      const fields = {tutorRating:10}
      await expect(tutor.setTutorData(tid,fields)).to.be.eventually.rejectedWith(Error)
    })
  })
  describe("Test findStudents()",()=>{
    beforeEach("add fake tutor/student data",async ()=>{
      await initDB(30)
      await initFakeStudentData(30)
      await initFakeTutorData(30)
    })
    afterEach("remove fake tutor/student data",async()=>{
      await deleteAllDoc()
    })

    it("should return student that match subject",async()=>{
      tid = 27
      assert.equal((await tutor.findStudents(tid,"subjectCount")).length,9)
      tid = 3
    })
  })
  describe("Test requestStudent()",()=>{
    const sids = [1,2,4]
    describe("test start request",()=>{
      it("is not able to request to inexist tutor",async()=>{
        assert.isFalse(await tutor.requestStudent(tid,10000,true))
      })
      it("should successfully start a request to one student",async()=>{
        await tutor.requestStudent(tid,sids[0],true)
        assert.deepEqual( (await getTutorData(tid))["studentRequest"],[sids[0]])
        assert.deepEqual( (await getStudentData(sids[0]))["receivedTutorRequest"],[tid])
      })
      it("should successfully start requests to multiple student",async()=>{
        await Promise.all([tutor.requestStudent(tid,sids[0],true),tutor.requestStudent(tid,sids[1],true),tutor.requestStudent(tid,sids[2],true)])
        assert.deepEqual( (await getTutorData(tid))["studentRequest"],sids)

      })
      it("should not make multiple request to same student",async()=>{
        await Promise.all([tutor.requestStudent(tid,sids[0],true),tutor.requestStudent(tid,sids[1],true),tutor.requestStudent(tid,sids[1],true)])
        assert.deepEqual( (await getTutorData(tid))["studentRequest"],[2,1])
      })

    })
    describe("test cancel request",()=>{
      it("is not able to cancel request to inexist student",async()=>{
        assert.isFalse(await tutor.requestStudent(tid,10000,false))
      })
      it("should not reject to not requested tutor",async()=>{
        assert.isFalse(await tutor.requestStudent(tid,sids[0],false))
      })
      it ("should allow to reject request to multi student", async()=>{
        await tutor.requestStudent(tid,sids[0],true)
        await tutor.requestStudent(tid,sids[1],true)
        await tutor.requestStudent(tid,sids[2],true)
        await tutor.requestStudent(tid,sids[0],false)
        await tutor.requestStudent(tid,sids[1],false)

        assert.deepEqual( (await getTutorData(tid))["studentRequest"],[sids[2]])
        assert.deepEqual( (await getStudentData(sids[0]))["receivedTutorRequest"],[])
      })
      it("should not reject mulitple times to 1 student",async()=>{
        await Promise.all([tutor.requestStudent(tid,sids[0],true),tutor.requestStudent(tid,sids[1],true),tutor.requestStudent(tid,sids[2],true)])
        await tutor.requestStudent(tid,sids[0],false)
        assert.equal(await tutor.requestStudent(tid,sids[0],false),false)
      })
    })
    
  })
  describe("Test startCase() ",()=>{
    beforeEach("add fake tutor/student data",async ()=>{
      await initDB(30)
      await initFakeStudentData(30)
      await initFakeTutorData(30)
    })
    afterEach("remove fake tutor/student data",async()=>{
      await deleteAllDoc()
    })

    it("should error on non existing tutor",async()=>{
      await expect(tutor.startCase(sid)).to.be.eventually.rejectedWith(Error)
    })
    it("should start a new case successfually",async()=>{
      await tutor.startCase(tid)
      assert.equal((await cases.getCases(tid))[0]["caseid"],1)
    })
    it("shouldstart multiple case if the tutor allow multiple case",async()=>{
      await tutor.startCase(tid)
      await tutor.startCase(tid)
      assert.equal((await cases.getCases(tid)).length, 2)
    })
    it("should not start multiple case if the tutor don't want multiple case",async()=>{
      assert.equal(await tutor.startCase(5),1)
      assert.equal(await tutor.startCase(5),0)
      assert.equal((await cases.getCases(5)).length,1)
    })
  })
  describe("Test inviteToCase() ",async()=>{
    beforeEach("add fake tutor/student data",async ()=>{
      await initDB(30)
      await initFakeStudentData(30)
      await initFakeTutorData(30)
    })
    afterEach("remove fake tutor/student data",async()=>{
      await deleteAllDoc()
    })

    const toInvited = [1,2,4]
    it("should successfully to invite to a case",async()=>{
      await tutor.startCase(tid)
      assert.equal(await tutor.inviteToCase(toInvited,tid,1),true)
      assert.deepEqual((await cases.getCases(tid))[0]["studentid"],toInvited)
    })
    it("should not repeated invited to case",async()=>{
      await tutor.startCase(tid)
      await tutor.inviteToCase(toInvited,tid,1)
      assert.isFalse(await tutor.inviteToCase([1,1,1],tid,1))     
    })
    it("should not add to case that not belongs to that tutor",async()=>{
      await tutor.startCase(tid)
      await tutor.startCase(22)
      assert.isFalse(await tutor.inviteToCase(toInvited,tid,2))
    })
  })
  describe("Test finishCase()",()=>{
    beforeEach("add fake tutor/student data",async ()=>{
      await initDB(30)
      await initFakeStudentData(30)
      await initFakeTutorData(30)
    })
    afterEach("remove fake tutor/student data",async()=>{
      await deleteAllDoc()
    })
    it("should successfully finish a case",async()=>{
      await tutor.startCase(tid)
      assert.isTrue(await tutor.finishCase(tid,1))
    })
    it("should not repeatly finish a case",async()=>{
      await tutor.startCase(tid)
      await tutor.finishCase(tid,1)
      assert.isFalse(await tutor.finishCase(tid,1))
    })
    it("should only let the given tutor to finish the case",async()=>{
      await tutor.startCase(tid)
      await tutor.finishCase(tid,1)
      assert.isFalse(await tutor.finishCase(22,1))
    })
  })
})