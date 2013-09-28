//
//  CCircle.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 11.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import "CCircleButton.h"

@implementation CCircleButton

@synthesize center=_center, radius=_radius, link=_link;

-(id)initWithCenter:(CGPoint)point radius:(CGFloat)radius link:(NSString *)link
{
    self = [super init];
    if (self)
    {
        _center = point;
        _radius = radius;
        _link = link;
    }
    return self;
}

-(BOOL)containsPoint:(CGPoint)point;
{
    int distance = (point.x - _center.x)*(point.x - _center.x) + (point.y - _center.y)*(point.y - _center.y);
    if (distance <= _radius*_radius)
    {
        return YES;
    }
    return NO;
}

@end
