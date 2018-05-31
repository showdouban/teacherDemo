/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');

    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

//        document.addEventListener("chcp_updateIsReadyToInstall", function(eventData){
//            var error = eventData.details.error;
//              if (error) {
//                console.log('Error with code: ' + error.code);
//                console.log('Description: ' + error.description);
//              }else{
//                    console.log('Success with code: );
//              }
//        }, false);




        document.getElementById("HotCode").addEventListener("click",function (){
                            var options = {
                              'config-file': 'http://192.168.41.17:81/chcp.json'
                            };
                            chcp.fetchUpdate( function(error, data){
                                    if (error) {
                                         console.log('Failed to load the update with error code: ' + error.code);
                                         console.log(error.description);
                                         return;
                                       }
                                       console.log('Update is loaded, running the installation');

                                       chcp.installUpdate(function(error){
                                        if (error) {
                                              console.log('Failed to install the update with error code: ' + error.code);
                                              console.log(error.description);
                                            } else {
                                              console.log('Update installed!');
                                            }
                                       });
                            },options);
                },true);


        document.getElementById("getExternalStorageDirectory").addEventListener("click",function (){
            cordova.exec(
                function (message) {
                    console.log("index.js : success = " + message);
                },
                function (message) {
                    alert("index.js : fail = " + message);
                },
                "Anoah",
                "getExternalStorageDirectory",
                ''
            );
        },true);

        document.getElementById("clickFinish").addEventListener("click",function (){
            cordova.exec(
                function (message) {
                    console.log("index.js : clickFinish = " + message);
                },
                function (message) {
                    alert("index.js : clickFinish = " + message);
                },
                "Anoah",
                "clickFinish",
                ''
            );
        },true);

        document.getElementById("getDeviceInfo").addEventListener("click",function (){
            cordova.exec(
                function (message) {
//                    alert("index.js : success = " + message);
                    console.log("index.js: success = " + message);
                },
                function (message) {
                    alert("index.js : fail = " + message);
                },
                "Anoah",
                "getDeviceInfo",
                ''
            );
        },true);

        var param = "{\"android.intent.extra.durationLimit\": 10}";
        document.getElementById("testMethod").addEventListener("click",function (){
            cordova.exec(
                function (message) {
                    console.log("index.js : success = " + message);
                },
                function (message) {
                    console.log("index.js : fail = " + message);
                },
                "Anoah",
                "openRecorder",
                [param]
            );
        },true);

        document.getElementById("playVideo").addEventListener("click",function (){
                    cordova.exec(
                        function (message) {
                            console.log("index.js : success = " + message);
                        },
                        function (message) {
                            console.log("index.js : fail = " + message);
                        },
                        "MediaPlayer",
                        "playVideoByVlc",
                        ['cdvfile://localhost/files-external/1.mp4']
                    );
                },true);


        var src = "cdvfile://localhost/files-external/22.mp3";
        var mediaRec = new Media(src,
                                    // success callback
                         function() {
                             console.log("recordAudio():Audio Success");
                         },

                                    // error callback
                         function(err) {
                             console.log("recordAudio():Audio Error: "+ err.code);
                       });

        document.getElementById("startRecord").addEventListener("click",function (){
                             mediaRec.startRecord();
                             setTimeout(function() {
                                     mediaRec.stopRecord();
                                 }, 10000);
                         },true);

        document.getElementById("playAudio").addEventListener("click",function (){

                        var my_media = new Media("cdvfile://localhost/files-external/22.mp3",
                                // success callback
                                function () {
                                    console.log("playAudio():Audio Success");
                                },
                                // error callback
                                function (err) {
                                    console.log("playAudio():Audio Error: " + err);
                                }
                            );
                            my_media.play();



                            // Update media position every second
                            var mediaTimer = setInterval(function () {
                                // get media position
                                my_media.getCurrentPosition(
                                    // success callback
                                    function (position) {
                                        if (position > -1) {
                                            console.log((position) + " sec");
                                        }
                                    },
                                    // error callback
                                    function (e) {
                                        console.log("Error getting pos=" + e);
                                    }
                                );
                            }, 1000);

                        setTimeout(function () {
                                my_media.pause();
                                }, 30000);

                        },true);

        document.getElementById("clearCache").addEventListener("click",function (){
                   cordova.exec(
                                 function (message) {
                                     console.log("index.js : success = " + message);
                                 },
                                 function (message) {
                                     console.log("index.js : fail11 = " + message);
                                 },
                                 "CacheControl",
                                 "clearCache",
                                 '');
                },true);

        document.getElementById("getCacheSize").addEventListener("click",function (){
                           cordova.exec(
                                         function (message) {
                                             console.log("index.js : success = " + message);
                                         },
                                         function (message) {
                                             console.log("index.js : fail11 = " + message);
                                         },
                                         "CacheControl",
                                         "getCacheSize",
                                         ''
                                               );
                        },true);

        document.getElementById("correctwork").addEventListener("click",function (){
                           cordova.exec(
                                         function (message) {
                                             console.log("index.js : success = " + message);
                                         },
                                         function (message) {
                                             console.log("index.js : fail11 = " + message);
                                         },
                                         "CorrectWork",
                                         "studentWork",
                                         ['1','111',10,1]
                                               );
                        },true);

         document.getElementById("addAction").addEventListener("click",function (){
                           cordova.exec(
                                         function (message) {
                                             console.log("index.js : success = " + message);
                                         },
                                         function (message) {
                                             console.log("index.js : fail11 = " + message);
                                         },
                                         "BuriedPoint",
                                         "addAction",
                                         [10101,"112211"]
                                               );
                        },true);

        document.getElementById("scanQRCode").addEventListener("click",function (){
                                   cordova.exec(
                                                 function (message) {
                                                     console.log("index.js : zxing = " + message);
                                                 },
                                                 function (message) {
                                                     console.log("index.js : zxingfail = " + message);
                                                 },
                                                 "Zxing",
                                                 "scanQRCode",
                                                 ''
                                                       );
                                },true);
                                /*https://dev.anoah.com/yxp_api2/debug/upload/getAuthTestType1/*/
        document.getElementById("Scratch").addEventListener("click",function (){
                                           cordova.exec(
                                                         function (message) {
                                                             console.log("index.js :clip = " + message);
                                                         },
                                                         function (message) {
                                                             console.log("index.js : clipfail = " + message);
                                                         },
                                                         "Scratch",
                                                         "scratchMode",
                                                         ['32850','2019741-subject:2-qtype:2','9002511525420300001','879002511526006800001f'
                                                         ,'9002511526006800001','','http://api2.dev.anoah.com/jwt/answer/draft/upload_auth/',
                                                         'http://dev.anoah.com/yxp_api2/jwt/answer/draft/save/','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cuZGV2LmFub2FoLmNvbSIsImV4cCI6MTUyNjk5NjY2MSwiZGV2aWNlIjoiVVBBRCIsIm1vZHVsZSI6IkVCQUdfU1RVREVOVCIsInZlcnNpb24iOiJ2MS4wIiwiTUFDIjoiIiwibWFjaGluZWlkIjoiIiwiVVVJRCI6IiIsInVzZXJpZCI6MCwidXNlcm5hbWUiOiIiLCJ0aW1lZGlmZiI6M30.0ZBycVTXYBe5Nin6jVQqHf649KQ22f8LZQ3Yxyk5T9g']
                                                               );
                                        },true);
        document.getElementById("TakePhoto").addEventListener("click",function (){
                                                   cordova.exec(
                                                                 function (message) {
                                                                     console.log("index.js :clip = " + message);
                                                                 },
                                                                 function (message) {
                                                                     console.log("index.js : clipfail = " + message);
                                                                 },
                                                                 "CompileImage",
                                                                 "takePhoto",
                                                                 ['32850','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cuZGV2LmFub2FoLmNvbSIsImV4cCI6MTUyNjk5NjY2MSwiZGV2aWNlIjoiVVBBRCIsIm1vZHVsZSI6IkVCQUdfU1RVREVOVCIsInZlcnNpb24iOiJ2MS4wIiwiTUFDIjoiIiwibWFjaGluZWlkIjoiIiwiVVVJRCI6IiIsInVzZXJpZCI6MCwidXNlcm5hbWUiOiIiLCJ0aW1lZGlmZiI6M30.0ZBycVTXYBe5Nin6jVQqHf649KQ22f8LZQ3Yxyk5T9g'
                                                                    ,'http://api2.dev.anoah.com/jwt/answer/record/upload_auth/']
                                                                       );
                                                },true);

        document.getElementById("ChoosePhoto").addEventListener("click",function (){
                                                           cordova.exec(
                                                                         function (message) {
                                                                               alert(3)
                                                                             console.log("index.js :clip = " + message);
                                                                         },
                                                                         function (message) {
                                                                                alert(4)
                                                                             console.log("index.js : clipfail = " + message);
                                                                         },
                                                                         "CompileImage",
                                                                         "choosePhoto",
                                                                         ['32850','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cuZGV2LmFub2FoLmNvbSIsImV4cCI6MTUyNjk5NjY2MSwiZGV2aWNlIjoiVVBBRCIsIm1vZHVsZSI6IkVCQUdfU1RVREVOVCIsInZlcnNpb24iOiJ2MS4wIiwiTUFDIjoiIiwibWFjaGluZWlkIjoiIiwiVVVJRCI6IiIsInVzZXJpZCI6MCwidXNlcm5hbWUiOiIiLCJ0aW1lZGlmZiI6M30.0ZBycVTXYBe5Nin6jVQqHf649KQ22f8LZQ3Yxyk5T9g'
                                                                                                                                             ,'http://api2.dev.anoah.com/jwt/answer/record/upload_auth/','6']
                                                                               );
                                                        },true);

         document.getElementById("clipImage").addEventListener("click",function (){
                                                                    cordova.exec(
                                                                                  function (message) {
                                                                                      console.log("index.js :clip = " + message);
                                                                                  },



                                                                                  function (message) {
                                                                                      console.log("index.js : clipfail = " + message);
                                                                                  },
                                                                                  "ClipImage",
                                                                                   "clipImage",
                                                                                    ['https://ss0.bdstatic.com/-0U0bnSm1A5BphGlnYG/tam-ogel/8110e764e668de05288a215de953205d_259_194.jpg',1,0]

                                                                                        );
                                                                                        },true);
        document.getElementById("installHot").addEventListener("click",function (){
                                                   chcp.installUpdate(function(error){
                                                    console.log("index.js : error = " + error);
                                                   });
                                                },true);
        document.getElementById("requestUpdate").addEventListener("click",function (){
                                                           var dialogMessage = '应用有新的更新,是否确定更新?';
                                                            chcp.requestApplicationUpdate(dialogMessage, function(){
                                                                //确认更新
                                                            }, function(){
                                                                  //不更新
                                                            });
                                                        },true);

        document.getElementById("captureVideo").addEventListener("click",function (){
                                                          navigator.device.capture.captureVideo(
                                                              function(mediaFiles) {
                                                                  var i, path, len;
                                                                  for (i = 0, len = mediaFiles.length; i < len; i += 1) {
                                                                      path = mediaFiles[i].fullPath;
                                                                      // do something interesting with the file
                                                                  }
                                                              }, function(error) {
                                                                     navigator.notification.alert('Error code: ' + error.code, null, 'Capture Error');
                                                                 }, ''
                                                          );
                                                        },true);

         document.getElementById("Laucher").addEventListener("click",function (){
                                                                             cordova.exec(
                                                                                           function (message) {
                                                                                               console.log("index.js :clip = " + message);
                                                                                           },
                                                                                           function (message) {
                                                                                               console.log("index.js : clipfail = " + message);
                                                                                           },
                                                                                           "Laucher",
                                                                                            "downLoadSecondLaucher",
                                                                                             ['http://apis2.dev.anoah.com:8181','1'] );
                                                                                             },true);


         document.getElementById("AliUpLoad").addEventListener("click",function (){
                            alert("eeeee");
                            cordova.exec(
                                          function (message) {
                                              console.log("AliUpLoad: fail11 = " + message);
                                              alert(message);
                                          },
                                          function (message) {
                                              console.log("AliUpLoad: fail11 = " + message);
                                          },
                                          "AliUpLoad",
                                          "upload",
                                          ['33737','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ3d3cuZGV2LmFub2FoLmNvbSIsImV4cCI6MTUyNzU4MDkwNSwiZGV2aWNlIjoiUENfQlJPV1NFUiIsIm1vZHVsZSI6IllPVVhVRS1CQU4iLCJ2ZXJzaW9uIjoidjEuMCIsIk1BQyI6IiIsIm1hY2hpbmVpZCI6IiIsIlVVSUQiOiIiLCJ1c2VyaWQiOiIxMDI0NjE5IiwidXNlcm5hbWUiOiJwdXJvbmdsb25nIiwidGltZWRpZmYiOi0xOS40NjkwMDAxMDEwODk0Nzh9.ZHitZIUp3t0hQWK4VQrKxLYzwg4q68jyJMhqj4bFDOA'
                                           ,'http://api2.dev.anoah.com/jwt/homework/correct/upload_auth',"['file:///storage/emulated/0/tencent/MicroMsg/WeiXin/mmexport15263616369381526376001596.jpg','file:///storage/emulated/0/DCIM/Camera/IMG_20180424_205651.jpg']"]);
                         },true);
//           document.getElementById("getStatusBarHeight").addEventListener("click",function (){
//                                                                                                cordova.exec(
//                                                                                                              function (message) {
//                                                                                                                  console.log("index.js :clip = " + message);
//                                                                                                              },
//                                                                                                              function (message) {
//                                                                                                                  console.log("index.js : clipfail = " + message);
//                                                                                                              },
//                                                                                                              "Laucher",
//                                                                                                               "getStatusBarHeight",
//                                                                                                                '');
//                                                                                                                },true);

          document.getElementById("ShowPhoto").addEventListener("click",function (){
                                     alert("22222");
                                     cordova.exec(
                                                   function (message) {
                                                       console.log("index.js : success = " + message);
                                                   },
                                                   function (message) {
                                                       console.log("index.js : fail11 = " + message);
                                                   },
                                                   "CompileImage",
                                                   "showPhoto",
                                                   [['file:///storage/emulated/0/tencent/MicroMsg/WeiXin/mmexport15263616369381526376001596.jpg','file:///storage/emulated/0/DCIM/Camera/IMG_20180424_205651.jpg'],0,0]);
                                  },true);
    },

    //android调用js方法
    showAlert: function (content) {
        console.log("index.js  : showAlert = " + content);
    },
};

app.initialize();