var myweb = angular
                  .module("mywebsite", ["ngRoute"])
                  .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
                    $routeProvider
                      .when("/", {
                        templateUrl: "pages/home.html",
                          activetab: 'home'
                      })
                      .when("/experience", {
                        templateUrl: "pages/experience.html",
                        controller: "experiencePage",
                        activetab: 'experience'
                      })
                      .when("/projects", {
                        templateUrl: "pages/projects.html",
                        controller: "projectsPage",
                        activetab: 'projects'
                      })
                      .when("/contact", {
                        templateUrl: "pages/contact.html",
                        controller: "formController",
                        activetab: 'contact'
                      })
                      .otherwise({
                        redirectTo: "/"
                      })
                      $locationProvider.html5Mode(true);
                  }])
                  .controller("experiencePage", function ($scope) {
                    $scope.techskills = "Technical Skills"

                    var technical = [
                      { type: "Programming Languages:", applications: "Java, Python" },
                      { type: "Web Development:", applications: "HTML, CSS, JavaScript, PHP, AngularJS, jQuery, API Design" },
                      { type: "Cloud Platform:", applications: "Azure, Docker, AWS" },
                      { type: "Database:", applications: "MongoDB, SQL Server, PSQL, MySQL" },
                      { type: "Mobile Application:", applications: "Android Studio" },
                      { type: "Tools:", applications: "Eclipse, IntelliJ IDEA, PyCharm, NetBeans, Weka, Scikit-learn" }
                    ];

                    $scope.technical = technical;

                    $scope.experience = "Work Experience"
                  })
                  .controller("projectsPage", function ($scope) {
                    $scope.project = "Projects"
                  })
                  .controller("formController", function($scope, $http) {
                    $scope.result = 'hidden'
                    $scope.resultMessage;
                    $scope.formData; //formData is an object holding the name, email, subject, and message
                    $scope.submitButtonDisabled = false;
                    $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
                    $scope.submit = function(contactform) {
                        $scope.submitted = true;
                        $scope.submitButtonDisabled = true;
                        if (contactform.$valid) {
                            $http({
                                method  : 'POST',
                                url     : 'www.waniakash.com/email.php',
                                data    : $.param($scope.formData),  //param method from jQuery
                                headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
                            }).success(function(data){
                                console.log(data);
                                if (data.success) { //success comes from the return json object
                                    $scope.submitButtonDisabled = true;
                                    $scope.resultMessage = data.message;
                                    $scope.result='bg-success';
                                } else {
                                    $scope.submitButtonDisabled = false;
                                    $scope.resultMessage = data.message;
                                    $scope.result='bg-danger';
                                }
                            });
                        } else {
                            $scope.submitButtonDisabled = false;
                            $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
                            $scope.result='bg-danger';
                        }
                    }
                  })
                  .controller("footer", function ($scope) {
                    $scope.backvideo = "videos/Northernlights.mp4"

                    button = [
                      { image: "images/LinkedIn.png", ref: "https://www.linkedin.com/in/akashwani09/", name: "LinkedIn" },
                      { image: "images/github.png", ref: "https://github.com/akashwani1991", name: "Github" },
                      { image: "images/Twitter.png", ref: "https://twitter.com/akashwani1991", name: "Twitter" },
                      { image: "images/Facebook.png", ref: "https://www.facebook.com/akashwani1991", name: "Facebook" },
                      { image: "images/Email.png", ref: "mailto:apw3928@rit.edu", name: "Email" }
                    ];

                    $scope.button = button;
                  })
                  .controller("download", function($scope) {
                    $scope.downloadPdf = "pages/Resume_Akash_Wani.pdf";
                  });
