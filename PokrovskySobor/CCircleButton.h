//
//  CCircle.h
//  PokrovskySobor
//
//  Created by GoloVaZa on 11.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface CCircleButton : NSObject
{
    CGPoint _center;
    CGFloat _radius;
    NSString *_link;
}

@property (nonatomic) CGPoint center;
@property (nonatomic) CGFloat radius;
@property (nonatomic, retain) NSString *link;

-(id)initWithCenter:(CGPoint)point radius:(CGFloat)radius link:(NSString*)link;
-(BOOL)containsPoint:(CGPoint)point;

@end
