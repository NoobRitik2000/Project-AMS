import express from 'express';

const router = express.Router();
// import User from '../Models/User.js';
import Asset from '../Models/Asset.js';
import Assignment from '../Models/Assignment.js';

router.post('/assign',async(req,res)=>{
        const {user_id,asset_id}=req.body;
        try {
            const asset =await Asset.findById(asset_id);
            if(!asset || !asset.status !=='available'){
                return res.status(400).json({message: 'Asset is not available!'});
            }
            const assignment =new Assignment({user:user_id,asset: asset_id});
            await assignment.save();

            //Update asset status to 'assigned'
            asset.status='assigned';
            await status.save();

            res.json({message:'Asset assigned successfully...'})

        } catch (error) {
            console.log(error);
            res.status(500).json({message:'Internal Server Error !!!'});
        }
})

router.get('/user/:user_id/assets',async(req,res)=>{
    const user_id=req.params.user_id;

    try {
        const assignments =await Assignment.find({user:user_id}).populate('asset');
        res.json(assignments);
    } catch (error) {
        console.log(error);
        
    }
})

module.exports=router;