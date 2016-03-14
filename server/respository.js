var db = {
    membersInfo:{description: 'fuisabfiusabfasui'},
    members:[
    {name:'ionut',email:'ionut@ionut.com',id:1}, 
    {name:'tudrel',email:'tudrel@tudrel.com',id:2},
    {name:'marusica',email:'marusciac@tudrel.com',id:3}
    ],
    blogsInfo:{description: 'blogs main description'},
    blogList:[ 
    {name:'blog1',email:'ionut@ionut.com',id:1}, 
    {name:'blog2',email:'tudrel@tudrel.com',id:2},
    {name:'blog3',email:'marusciac@tudrel.com',id:3}
    ],
    users:[
    {},
    {}
    ]
};


module.exports = {
    create:function(repo){        

        return{

            repoName: repo,

            find:function(callback){
                        
                callback(null,{data:db[this.repoName]});
            }
        };
    }
};