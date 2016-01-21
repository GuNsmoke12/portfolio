this.assessment = (function () {
    return {
        questionSelection: [],
        setUpSuspendData: function (assessment) {
            T2.suspendData.data.tracking.assessments[assessment] = {
                locked: false,
                bestScore: 0,
                latestScore: 0,
                attempt: 0,
                questions: 0,
                answered: 0,
                correct: 0,
                completed: false
            };
        },
        reset: function (assessment) {
            var i,
                trackedAssessment = T2.suspendData.data.tracking.assessments[assessment],
                assessmentSession = T2.session.data.assessment;
            trackedAssessment.questions = 0;
            for (i = 0; COURSEPROPS.assessments[assessment]['group'+i]; i++) {
                if (COURSEPROPS.assessments[assessment]['group'+i].questionAmount === 'all') {
                    trackedAssessment.questions += COURSEPROPS.assessments[assessment]['group'+i].questions.length;
                } else {
                    trackedAssessment.questions += COURSEPROPS.assessments[assessment]['group'+i].questionAmount;
                }
            }
            trackedAssessment.correct = 0;
            trackedAssessment.answered = 0;
            assessmentSession.launchPageInfo.wasLastPage = T2.page.lastPage;
            assessmentSession.launchPageInfo.topic = T2.page.topic;
            assessmentSession.launchPageInfo.pageId = T2.page.id;
            assessmentSession.launchPageInfo.totalTopicPages = T2.page.totalTopicPages;
            assessmentSession.launchPageInfo.topicPage = T2.page.topicPage;
            this.refreshSelection(assessment);
        },
        refreshSelection: function (assessment) {
            var i, group, amount, questionAmount,
                questionArray = [];
            T2.session.data.assessment.currentAssessment = assessment;
            T2.session.data.assessment.questionSelection = [];
            for (i = 0; COURSEPROPS.assessments[assessment]['group'+i]; i++) {
                group = COURSEPROPS.assessments[assessment]['group'+i];
                questionArray = group.questions.slice();
                questionAmount = (group.questionAmount === 'all' ? questionArray.length : group.questionAmount);
                for (amount = (questionArray.length - questionAmount); amount > 0; amount--) {
                    questionArray.splice(Math.floor(Math.random()*questionArray.length), 1);
                }
                questionArray = (group.questionAmount === 'all' ? questionArray : this.shuffle(questionArray));
                T2.session.data.assessment.questionSelection = T2.session.data.assessment.questionSelection.concat(questionArray);
            }
            if (COURSEPROPS.assessments[assessment].randomAll) {
                T2.session.data.assessment.questionSelection = this.shuffle(T2.session.data.assessment.questionSelection);
            }
        },
        shuffle: function (array) {
            var currentIndex = array.length,
                temporaryValue,
                randomIndex;
            // While there remain elements to shuffle...
            while (0 !== currentIndex) {
                // Pick a remaining element...
                randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex -= 1;
                // And swap it with the current element.
                temporaryValue = array[currentIndex];
                array[currentIndex] = array[randomIndex];
                array[randomIndex] = temporaryValue;
            }
            return array;
        },
        getScore: function (assessment) {
            var assessment = assessment || T2.session.data.assessment.currentAssessment;
            return Math.floor((T2.suspendData.data.tracking.assessments[assessment].correct / T2.suspendData.data.tracking.assessments[assessment].questions) * 100);
        },
        isPassed: function (assessment) {
            var assessment = assessment || T2.session.data.assessment.currentAssessment,
                passMark = COURSEPROPS.assessments[assessment].passMark || 100;
            return (this.getScore(assessment) >= passMark);
        },
        updateValues: function (correct) {
            var assessment = T2.session.data.assessment.currentAssessment;
            if (correct) {
                T2.suspendData.data.tracking.assessments[assessment].correct++;
            }
            T2.suspendData.data.tracking.assessments[assessment].answered++;
        },
        updateLocked: function () {
            var assessment = T2.session.data.assessment.currentAssessment,
                assessmentTracking = T2.suspendData.data.tracking.assessments[assessment],
                maxAttempts = COURSEPROPS.assessments[assessment].maxAttempts || 0;
            if (maxAttempts !== 0 && assessmentTracking.attempt >= maxAttempts) {
                assessmentTracking.locked = true;
            }
        }
    };
}());