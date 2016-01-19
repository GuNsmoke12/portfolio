Talent2 HTML Template
 
 
 ##Assessment setup (24/09/2014)
 
 ###COURSEPROPS
 When including assessments in the module, you need to include an `assessments` object inside COURSEPROPS.
 ```html
 <script>
 	var COURSEPROPS = {
 		assessments: {}
 	}
 </script>
 ```
 Inside this `assessments` object, include a new object for each assessment you want in the module. These indivual assessment objects contain the properties used to setup each assessment. Each new object **MUST** be named `assessmentX`, where **_X_** is a number from **0** up. 
 ```html
 <script>
 	var COURSEPROPS = {
 		assessments: {
 		  assessment0: {},
 		  assessment1: {},
 		  assessment2: {}
 		}
 	}
 </script>
 ```
 Inside each specific assessment object is where you set the properties of that assessment. The following are properties of the assessment:
 ###Assessment Properties
 ####assessmentX.completeModuleOnPass
 Type: `Boolean`
 Default value: `false`
 Possible values: `true || false`
 
 This is used to tell the module to run the `completeModule()` function upon successful completion of the assessment. Typically this would be set to `true` when the assessment is at the very end of a module.
 
 ####assessmentX.failOnIncorrect
 Type: `Boolean`
 Default value: `false`
 Possible values: `true || false`
 
 This is used to end the assessment if the user gets any questions wrong. When set to `true`, as soon as a question is answered incorrectly, the user is taken to the failed results page and the assessment is not completed.
 
 ####assessmentX.saveScoreOnPassOnly
 Type: `Boolean`
 Default value: `false`
 Possible values: `true || false`
 
 This is used to prevent the user's score from being saved upon failure of the assessment. This would typically be used during an RPL scenerio.
 
 ####assessmentX.passMark
 Type: `Integer`
 Default value: `100`
 Possible values: `Integer from 0 to 100`
 
 This is the pass percentage required to pass the assessment.
 
 ####assessmentX.maxAttempts
 Type: `Integer`
 Default value: `0 (unlimited)`
 Possible values: `Integer`
 
 This is the max attempts allowed for the assessment before the assessment is marked as locked. Setting a max attempts value of **0** translates as **unlimited attempts**.
 
 ####assessmentX.randomAll
 Type: `Boolean`
 Default value: `false`
 Possible values: `true || false`
 
 This is used to randomise the question array *after* the question array from each question group has been gathered.
 
 ####assessmentX.passedGoTo
 Type: `String`
 Default value: `passed.html`
 
 This property specifies which html page to go to when the assessment is passed.
 
 ####assessmentX.failedGoTo
 Type: `String`
 Default value: `failed.html`
 
 This property specifies which html page to go to when the assessment is failed.
 
 ####assessmentX.groupX
 Type: `Object`
 
 This object lists the questions from which the assessment can create its question array, and the amount of questions it can choose from the list. **There must always be a "group0", and the groups must always start from 0, incrementing upwards.**
 
 Example:
 ```html
 <script>
 	var COURSEPROPS = {
 		assessments: {
 		  assessment0: {
             group0: {},
             group1: {}
           }
 		}
 	}
 </script>
 ```
 ####assessmentX.groupX properties
 Each group must contain the following two properties. Without these properties, the assessment will not be able to create its question list array.
 #####groupX.questions
 Type: `Array`
 Default value: `[]`
 Possible values: `['String','String', etc.]`
 
 This array is used to list the filenames (excluding the '.html') of each question page wanting to be available in the group. The strings in the array must be exactly the same as the filename, including case, otherwise the question array will not work.
 
 #####groupX.questionAmount
 Type: `Integer || String`
 Default value: `undefined`
 Possible values: `Integer value from 0 to questions array length || The string 'all'`
 Special functionality: `Question randomisation will always be true unless the string value 'all' is used.`
 
 This property tells the assessment how many questions to grab from the **groupX.questions array** and insert into the assessment question list. Using the string 'all' will tell the assessment to use all the questions listed in the array.
 *Note:* using an integer less than 0 or greater than the array length will cause an error when the assessment tries to create the question list.
 
 Example:
 ```html
     group0: {
         questions: ['q1','q2','q3'],
         questionAmount: 2
     }
 ```
 
 ###Usage Example
 This example shows the assessment object fully setup with multiple assessments and all properties.
 
 ```html
 <script>
 	var COURSEPROPS = {
 		assessments: {
             assessment0: {
                 completeModuleOnPass: false,
                 failOnIncorrect: false,
                 saveScoreOnPassOnly: false,
                 passMark: 50,
                 maxAttempts: 3,
                 randomAll: true,
                 passedGoTo: 'passed.html',
                 failedGoTo: 'failed.html',
                 group0: {
                     questions: ['q1','q2','q3'],
                     questionAmount: 2
                 },
                 group1: {
                     questions: ['q4','q5','q6'],
                     questionAmount: 1
                 }
             },
             assessment1: {
                 completeModuleOnPass: true,
                 failOnIncorrect: true,
                 saveScoreOnPassOnly: true,
                 passMark: 100,
                 maxAttempts: 1,
                 randomAll: false,
                 passedGoTo: 'rplpassed.html',
                 failedGoTo: 'rplfailed.html',
                 group0: {
                     questions: ['q1','q2','q3','q4','q5','q6'],
                     questionAmount: 'all'
                 }
             }
         }
 	}
 </script>
 ```
 ###Making Assessments 'Trackable'
 By default, assessments will not 'trackable', a.k.a. compulsory, unless they are listed within the COURSEPROPS.topics object. To make an assessment 'trackable', it should be included within a topic object inside the COURSEPROPS, under the property `assessment:`
 
 Example:
 ```html
 var COURSEPROPS = {
     topics: {
         list: ['topic0', 'topic1', 'topic2'],
         topic0: {pages: 2},
         topic1: {pages: 5, name: 'Hello World'},
         topic2: {pages: 4, name: 'Goodbye World', assessment: 'assessment0'}
     }
 }
 ```
 Having it included within a topic means
 - the topic won't complete until that particular assessment is complete,
 - the progress bar won't reach 100% until the assessment is marked as complete
 
 ###Assessment question HTML pages
 
 Assessment HTML pages are setup the same as a regular question page but with the following 2 extra steps in setup.
 
 1. The filename must be written `qX.html`, where the **_X_** is an **integer from 0 upwards**.
 2. The page property `PAGEPROPS.assessmentQuestion` must be set to true within script tags on the page.
 
 ```html
 <script>
     PAGEPROPS.assessmentQuestion = true;
 </script>
 ```
 ###Results HTML pages
 Each assessment can have individual results pages, or use the same results pages. Which html page the assessment goes to can be set in the `COURSEPROPS.assessments.assessmentX` object under `passedGoTo` and `failedGoTo`. If no html pages are specified, the module will go to `passed.html` or `failed.html` by default.
 
 The results pages are setup like a normal presentation page, except with the following PAGEPROPS within script tags in the html
 
 1. `PAGEPROPS.disabledButtons.push('backButton');`
 2. `PAGEPROPS.pageType = 'results';`
 
 Additonally, `PAGEPROPS.endPageAction` can be used to specifiy a specific html page to navigate to when the user clicks the NEXT button, instead of navigating to the default location. By default, the navigation is to the next page within the topic or the menu page if the assessment was the last page in the topic.
 ```html
 PAGEPROPS.endPageAction = function () {
     window.location.href = 'insertpagehere.html';
 }
 ```
 
 Text replacement has also been included in the script tags and, for the time being, can be setup like so:
 ```html
 $(document).ready( function () {
     var assessmentData = T2.suspendData.data.tracking.assessments[T2.session.data.assessment.currentAssessment],
         assessmentScore = assessmentData.latestScore,
         assessmentAttempt = assessmentData.attempt,
         assessmentQuestions = assessmentData.questions,
         assessmentAnswered = assessmentData.answered,
         assessmentCorrect = assessmentData.correct;
     $('#results-score').text('Final Score: '+assessmentScore+'%');
     $('#results-attempts').text('Attempt: '+assessmentAttempt);
     $('#results-questions').text('Total questions in assessment: '+assessmentQuestions);
     $('#results-answered').text('Total questions answered: '+assessmentAnswered);
     $('#results-correct').text('Total questions correctly answered: '+assessmentCorrect);
 });
 ```
 ####Usage Example
 ```html
 <script>
     $(document).ready( function () {
         var assessmentData = T2.suspendData.data.tracking.assessments[T2.session.data.assessment.currentAssessment],
             assessmentScore = assessmentData.latestScore,
             assessmentAttempt = assessmentData.attempt,
             assessmentQuestions = assessmentData.questions,
             assessmentAnswered = assessmentData.answered,
             assessmentCorrect = assessmentData.correct;
         $('#results-score').text('Final Score: '+assessmentScore+'%');
         $('#results-attempts').text('Attempt: '+assessmentAttempt);
         $('#results-questions').text('Total questions in assessment: '+assessmentQuestions);
         $('#results-answered').text('Total questions answered: '+assessmentAnswered);
         $('#results-correct').text('Total questions correctly answered: '+assessmentCorrect);
     });
     PAGEPROPS.disabledButtons.push('backButton');
     PAGEPROPS.pageType = 'results';
     PAGEPROPS.endPageAction = function () {
         window.location.href = 'topic2p3.html';
     }
 </script>
 ```