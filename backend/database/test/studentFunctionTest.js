/**
 * all test cases should at least follow statement-coverage criterion
 * 
 */

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
const {getStudentData,getTutorData} = require("../userGetter")

const fakeData = require("./test_data/fakeuser_new.json")

const {initDB,dropAll, deleteAllDoc,deleteMock,startMultipleRequestToTutor,
  initFakeStudentData,initFakeTutorData} = require("./db_init/dbHandler");

describe("Testing functions in student.js",()=>{
  before("connnect to db and add test data ",async ()=>{
    //connect to mongodb
    await mongoose.connect(dbUri,{ useNewUrlParser: true, useUnifiedTopology: true })
  
    
  })
  after("remove all documents",async ()=>{
    await deleteAllDoc()
    mongoose.disconnect()
  })

  describe("test getStudentData() function",async()=>{
    const sid = 1
    beforeEach("insert new set of test data",async ()=>{
      //insert document here
      await initDB(30)
    })
  
    afterEach("remove all documents",async ()=>{
    await deleteAllDoc()
    })

    it("should return a student with existing sid",async()=>{
      assert.equal((await getStudentData(sid))["studentid"],sid)

    })
    it("should throw error with non-existing student",async()=>{
      await expect(getStudentData(999)).to.be.eventually.rejectedWith(Error)
    })
  })

  describe("test setStudentData() function",async()=>{
    const sid = 1
    beforeEach("insert new set of test data",async ()=>{
      //insert document here
      await initDB(30)
    })
  
    afterEach("remove all documents",async ()=>{
    await deleteAllDoc()
    })

    it ("should successfully insert 1 type of info",async()=>{
      await student.setStudentData(sid,{grade:10})
      assert.equal((await getStudentData(sid))["grade"],10)
    })

    it ("should be false if inserting to a student that don't exist",async()=>{
      assert.isFalse(await student.setStudentData(60,{grade:10}))
      
    })
    it ("should successfully insert multiple types of info",async()=>{
      await student.setStudentData(sid,{grade:10,preferredFee:[100,150]})
      const d = await getStudentData(sid)
      assert.equal(d["grade"],10)
      assert.deepEqual(d["preferredFee"],[100,150])
    })
    it ("should successfully alter existing info",async()=>{
      await student.setStudentData(sid,{grade:10,preferredFee:[100,150]})
      await student.setStudentData(sid,{grade:10,preferredFee:[100,300]})
      const d = await getStudentData(sid)
      assert.equal(d["grade"],10)
      assert.deepEqual(d["preferredFee"],[100,300])
    })
    it ("should throw error on altering field thats not allow to alter",async()=>{
      await expect(student.setStudentData(sid,{grade:10,receivedTutorRequest:[1,2]})).to.be.eventually.rejectedWith(Error)
      /*
      const d = await getStudentData(sid)
      assert.equal(d["grade"],undefined)
      assert.deepEqual(d["receivedTutorRequest"],[])
      */
    })

  })

  describe("test findTutors()",async()=>{
    beforeEach("add fake tutor/student data",async ()=>{
      await initDB(30)
      await initFakeStudentData(30)
      await initFakeTutorData(30)
    })
    afterEach("remove fake tutor/student data",async()=>{
      await deleteAllDoc()
    })
    it("should return tutor that matched subject",async()=>{
      //8 tutors matched in test case
      assert.equal((await student.findTutors(1,"subjectCount")).length,8)
    })
  })

  describe("test requestTutor()",()=>{
    const sid = 1
    const sid2 = 2
    const tids = [3,5,6]
    beforeEach("insert new set of test data",async ()=>{
      //insert document here
      await initDB(30)
    })
  
    afterEach("remove all documents",async ()=>{
    await deleteAllDoc()
    })

    describe("test requestTutor() (start request)",async()=>{

      it("is not able to request to inexist tutor",async()=>{
        //test the first try block
        //await expect(student.requestTutor(sid,1000,true)).to.eventually.be.rejectedWith(Error);
        //assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [] )
        assert.isFalse(await student.requestTutor(sid,1000,true))
      })
  
      it("should successfully start a request to one tutor",async()=>{
        //test the if-part
        await student.requestTutor(sid,tids[0],true)
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [tids[0]] )
        assert.deepEqual( (await getTutorData(tids[0]))["receivedStudentRequest"], [sid] )
      })
      it("should successfully start requests to multiple tutor",async()=>{
        //test the if-part
        for (const tid of tids){
          await student.requestTutor(sid,tid,true)
          assert.deepEqual( (await getTutorData(tid))["receivedStudentRequest"], [sid] )
        }
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], tids )
      })
      it("should not make multiple request to same tutor",async()=>{
        //test if(resStudent === null || resTutor === null) in the if-blcok
        await student.requestTutor(sid,tids[0],true)
        await student.requestTutor(sid,tids[1],true)
        await student.requestTutor(sid,tids[1],true)
  
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [tids[0],tids[1]] )
        assert.deepEqual( (await getTutorData(tids[0]))["receivedStudentRequest"], [sid] )
        assert.deepEqual( (await getTutorData(tids[1]))["receivedStudentRequest"], [sid] )
      })
      
    })
  
    describe("test requestTutor() (cancel request)",async()=>{
  
      it ("is not able to cancel request to inexist tutor",async()=>{
        //await expect(student.requestTutor(sid,1000,false)).to.eventually.be.rejectedWith(Error);
        assert.isFalse(await student.requestTutor(sid,1000,false))
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [] )
      })
      it ("should not reject to not requested tutor",async()=>{
        assert.isFalse(await student.requestTutor(sid,tids[1],false))
        
        
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [])
        assert.deepEqual( (await getTutorData(tids[1]))["receivedStudentRequest"], [] )
        
  
      })
      it ("should allow to reject request to 1 tutor",async()=>{
        await student.requestTutor(sid,tids[0],true)
        await student.requestTutor(sid,tids[0],false)
  
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [])
        assert.deepEqual( (await getTutorData(tids[0]))["receivedStudentRequest"], [] )
      })
      it ("should allow to reject request to multi tutor",async()=>{
        //Promise.all(tids.map((tid)=>{student.requestTutor(sid,tid,true)}))
        startMultipleRequestToTutor(sid,tids)
        //reject first 2 tutor
        await student.requestTutor(sid,tids[0],false)
        await student.requestTutor(sid,tids[1],false)
  
        assert.deepEqual( (await getStudentData(sid))["tutorRequest"], [tids[2]])
  
      })
      it ("should not reject mulitple times to 1 tutor",async()=>{
        startMultipleRequestToTutor(sid,tids)
        await student.requestTutor(sid,tids[0],false)
        assert.equal(await student.requestTutor(sid,tids[0],false),false)
      })
    })
  })
  

  describe("test reviewTutor()",async()=>{
    const sid = 1
    const tid = 3
    beforeEach("insert new set of test data",async ()=>{
      //insert document here
      await initDB(30)
    })
  
    afterEach("remove all documents",async ()=>{
    await deleteAllDoc()
    })

    it("should return false on finding non existing tutor",async()=>{
      //assert.isFalse(await student.reviewTutor(999,1))
    })
    it("should update the rating successfully on exist tutor",async ()=>{
      assert.isTrue(await student.reviewTutor(tid,3))
      const t = await getTutorData(tid)
      assert.equal(t["tutorRating"],3)
    })
    it("should update multiple times the rating successfully on exist tutor",async ()=>{
      assert.isTrue(await student.reviewTutor(tid,3))
      assert.isTrue(await student.reviewTutor(tid,5))
      assert.isTrue(await student.reviewTutor(tid,5))
      const t = await getTutorData(tid)
      assert.equal(t["tutorRating"],13 / 3)
    })
    it("should not update with invalid rating score",async ()=>{
      assert.isFalse(await student.reviewTutor(tid,30))
      const t = await getTutorData(tid)
      assert.equal(t["numberCaseFinished"],0)
    })
  })
  

})