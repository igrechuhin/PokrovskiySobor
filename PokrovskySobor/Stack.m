//
//  Stack.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 22.09.13.
//  Copyright (c) 2013 pbsputnik. All rights reserved.
//

#import "Stack.h"

@implementation Stack

- (id)initWithObject:(id)object {
    if (self = [super init]) {
        contents = [[NSMutableArray alloc] init];
        [contents addObject:object];
    }
    return self;
}

// Stack methods

- (void)push:(id)object {
    [contents addObject:object];
}

- (id)pop {
    NSUInteger count = [contents count];
    if (count > 0) {
        id returnObject = [contents objectAtIndex:count - 1];
        [contents removeLastObject];
        return returnObject;
    }
    else {
        return nil;
    }
}

@end
