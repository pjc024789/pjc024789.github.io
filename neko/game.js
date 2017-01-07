var loadSprite = function(name) {
    return cc.Sprite.createWithSpriteFrame(
        cc.spriteFrameCache.getSpriteFrame(name));
}

var createAnimation = function(name, n, interval) {
    var animFrames = [];
    for (var i = 1; i <= n; i++) {
        var str = name + "_0" + i + ".png";
        var frame = cc.spriteFrameCache.getSpriteFrame(str);
        animFrames.push(frame);
    }
    var animation = cc.Animation.create(animFrames, interval);
    var animate = cc.Animate.create(animation);
    
    return cc.RepeatForever.create(
        cc.Sequence.create(
            animate,
            animate.reverse()));
}

var GameScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        
        cc.spriteFrameCache.addSpriteFrames("game.plist");
        
        this.title = loadSprite("title.png");
        this.cat1 = loadSprite("cat1_01.png");
        this.cat2 = loadSprite("cat2_01.png");
        this.ball1 = loadSprite("ball1_01.png");
        this.ball2 = loadSprite("ball2_01.png");
        this.background_1 = loadSprite("sysimg_haikei_05.png");
        this.background_2 = loadSprite("sysimg_haikei_06.png");
        
        console.log(this.background_1);
        
        this.background_1.setAnchorPoint(cc.p(0,0));
        this.background_2.setAnchorPoint(cc.p(0,0));
        
        this.background_1.setPosition(cc.p(0, -60));
        this.background_2.setPosition(cc.p(512 * 0.72, -60));
        
        this.background_1.setScale(0.72);
        this.background_2.setScale(0.72);
        
        this.title.setScale(0.5);
        this.title.setPosition(cc.p(620,27));
        
        this.cat1.setScale(0.7)
        this.cat1.setPosition(cc.p(100,44));
        
        this.cat2.setScale(0.6)
        this.cat2.setPosition(cc.p(440,54));
        
        //this.ball1.setScale(0.7);
        //this.ball1.setPosition(cc.p(80,44));
        
        this.addChild(this.background_1);
        this.addChild(this.background_2);
        this.addChild(this.title);
        
        this.addChild(this.cat1);
        this.cat1.addChild(this.ball1);
        this.addChild(this.cat2);
        this.cat2.addChild(this.ball2);
        
        this.cat1.runAction(createAnimation("cat1", 5, 0.15));
        this.ball1.runAction(createAnimation("ball1", 5, 0.15));
        this.cat2.runAction(createAnimation("cat2", 5, 0.12));
        this.ball2.runAction(createAnimation("ball2", 5, 0.11));
        
        var moveBall = cc.Sequence.create(
                cc.MoveTo.create(0, 44, 60), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 50, 60), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 60, 62), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 64, 65), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 66, 68), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 66, 68), cc.DelayTime.create(0.15),
                // reverse
                cc.MoveTo.create(0, 64, 65), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 60, 62), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 50, 60), cc.DelayTime.create(0.15),
                cc.MoveTo.create(0, 44, 60), cc.DelayTime.create(0.15));
        this.ball1.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    moveBall
                )));
                
       var moveBall2 = cc.Sequence.create(
                cc.MoveTo.create(0, 80, 18), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 66, 14), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 50, 10), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 40, 14), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 30, 13), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 30, 13), cc.DelayTime.create(0.12),
                // reverse
                cc.MoveTo.create(0, 40, 14), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 50, 10), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 66, 14), cc.DelayTime.create(0.12),
                cc.MoveTo.create(0, 80, 18), cc.DelayTime.create(0.12));
        this.ball2.runAction(
            cc.RepeatForever.create(
                cc.Sequence.create(
                    moveBall2
                )));
    }
});
