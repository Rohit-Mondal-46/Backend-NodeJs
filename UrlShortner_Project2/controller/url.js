let nanoid;
(async () => {
  const module = await import('nanoid');
  nanoid = module.nanoid;
})();
const Url = require('../models/url');
const { getUser } = require('../service/Auth');


async function handleCreateShortId(req,res){
    try {
        const id = nanoid(8);
        // const createdBy = getUser(req.cookies.uid)._id;
        // console.log('at posting',req.user._doc._id);
        const newUrl = await Url.create({
            originalUrl:req.body.url,
            shortUrlId:id,
            visitedHistory : [],
            createdBy:req.user._doc._id
        })
        return res.status(201).render("home",{id:newUrl.shortUrlId})
    } catch (error) {
        return res.status(400).send(`Error!`)
    }
}

async function handleRedirect(req,res){
    try {
        const id = req.params.shortId;
        const url = await Url.findOneAndUpdate({ shortUrlId:id },{
            $push:{
                visitedHistory:Date.now()
            }
        })
        if(!url)
            return res.status(404).send("404 Not Found");
        return res.status(300).redirect(url.originalUrl);
    } catch (error) {
        return res.send("Error")
    }
}

async function handleAnalytics(req,res){
    try {
        console.log('handleAnalytics called');
        const id = req.params.shortId;
        const url = await Url.findOne({shortUrlId:id})
        console.log(id);
        if(!url){
            return res.status(404).send("404 Not Found")
        }
        return res.status(200).json({
            "clicks":`${url.visitedHistory?.length}`,
        })
    } catch (error) {
        console.log('error in handleAnalytics ');
        return res.status(400).send("error in analytics")
    }
}
module.exports = {
    handleCreateShortId,handleRedirect,handleAnalytics
}