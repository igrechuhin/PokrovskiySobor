//
//  Stack.h
//  PokrovskySobor
//
//  Created by GoloVaZa on 22.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Stack : NSObject
{
    NSMutableArray *contents;
}

- (id)initWithObject:(id)object;
- (void)push:(id)object;
- (id)pop;

@end
