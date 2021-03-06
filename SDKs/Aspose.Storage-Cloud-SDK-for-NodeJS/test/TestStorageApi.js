var fs = require('fs');
var StorageApi = require('../lib/StorageApi');
var assert = require('assert');

var AppSID = 'XXX';
var AppKey = 'XXX';
var config = {'appSid':AppSID,'apiKey':AppKey , 'debug' : true};
var data_path = '../../../Data/';

var storageApi = new StorageApi(config);
 
var nodeunit = require('nodeunit');

exports.testGetDiscUsage = function(test){
	test.expect(2);
	storageApi.GetDiscUsage('', function(responseMessage) {
		if(config.debug){console.log('status:', responseMessage.status);}
		if(config.debug){console.log('body:', responseMessage.body);}
		test.equal(responseMessage.status, 'OK', '');
		test.ok(responseMessage.body !== null && typeof responseMessage.body.DiscUsage !== 'undefined', "response body assertion should pass");
		test.done();
	});
    
};

exports.testGetIsExist = function(test){
	test.expect(3);
	var name = 'testfile.txt';
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		
		test.equal(responseMessage.status, 'OK', '');
		
		storageApi.GetIsExist(name, versionId=null, storage=null, function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.ok(responseMessage.body !== null && typeof responseMessage.body.FileExist !== 'undefined', "response body assertion should pass");
			test.done();
		});
		
	});
};


exports.testPutCopy = function(test){
	test.expect(2);
	name = 'testfile.txt';
	newdest = 'new-testfile.txt';
	
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.PutCopy(name, newdest, null, null, null, file=null, function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});
};


exports.testGetDownload = function(test){
	test.expect(2);
	name = 'testfile.txt';
	
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.GetDownload(name, versionId=null, storage=null, function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}			
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    
};


exports.testPutCreate = function(test){
	test.expect(1);
	name = 'testfile.txt';
	
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		if(config.debug){console.log('status:', responseMessage.status);}
		if(config.debug){console.log('body:', responseMessage.body);}
		test.equal(responseMessage.status, 'OK', '');
		test.done();
	});
};


exports.testDeleteFile = function(test){
	test.expect(2);
	name = 'testfile.txt';	
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.DeleteFile(Path=name, versionId=null, storage=null, function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    
    
};


exports.testPostMoveFile = function(test){
	test.expect(2);
	name = 'testfile.txt';	
	dest = 'new-testfile.txt';
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.PostMoveFile(name, dest, versionId=null, storage=null, destStorage=null,function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    
    
};


exports.testPutCopyFolder = function(test){
	test.expect(2);
	name = 'test0';	
	newdest = 'test1';
	storageApi.PutCreateFolder(name, storage=null, destStorage=null, function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.PutCopyFolder(name, newdest, storage=null, destStorage=null,function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    

    
};


exports.testGetListFiles = function(test){
	test.expect(2);
	
	storageApi.GetListFiles(Path='farooq', storage=null, function(responseMessage) {
		if(config.debug){console.log('status:', responseMessage.status);}
		if(config.debug){console.log('body:', responseMessage.body);}
		test.equal(responseMessage.status, 'OK', '');
		test.ok(responseMessage.body !== null && responseMessage.body !==null && typeof responseMessage.body.Files !== 'undefined', "response body assertion should pass");
		test.done();
	});
    
};


exports.testPutCreateFolder = function(test){
	test.expect(1);
	name = 'test0';
	storageApi.PutCreateFolder(name, storage=null, destStorage=null, function(responseMessage) {
		if(config.debug){console.log('status:', responseMessage.status);}
		if(config.debug){console.log('body:', responseMessage.body);}
		test.equal(responseMessage.status, 'OK', '');
		test.done();
	});    
    
};


exports.testDeleteFolder = function(test){
	test.expect(2);
	name = 'test0';
	storageApi.PutCreateFolder(name, storage=null, destStorage=null, function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.DeleteFolder(name, storage=null, recursive=false,function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    
    
};


exports.testPostMoveFolder = function(test){
	test.expect(2);
	name = 'test0';	
	dest = 'test1';
	storageApi.PutCreateFolder(name, storage=null, destStorage=null, function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.PostMoveFolder(name, dest, storage, destStorage, function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.done();
		});
	});    
    
};


exports.testGetListFileVersions = function(test){
	test.expect(3);
	name = 'testfile.txt';
	storageApi.PutCreate(name, versionId=null, storage=null, file= data_path + name , function(responseMessage) {
		test.equal(responseMessage.status, 'OK', '');
		storageApi.GetListFileVersions(name, storage=null,function(responseMessage) {
			if(config.debug){console.log('status:', responseMessage.status);}
			if(config.debug){console.log('body:', responseMessage.body);}
			test.equal(responseMessage.status, 'OK', '');
			test.ok(responseMessage.body !== null && typeof responseMessage.body.FileVersions !== 'undefined', "response body assertion should pass");			
			test.done();
		});
	});    

    
};


exports.testGetIsStorageExist = function(test){
	test.expect(2);
	var name='AsposeDropBox'
	storageApi.GetIsStorageExist(name, function(responseMessage) {
		if(config.debug){console.log('status:', responseMessage.status);}
		if(config.debug){console.log('body:', responseMessage.body);}
		test.equal(responseMessage.status, 'OK', '');
		test.ok(responseMessage.body !== null && typeof responseMessage.body.IsExist !== 'undefined', "response body assertion should pass");
		test.done();
	});
    
};
