//
//  PhotoGalleryController.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 06.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import "PhotoGalleryController.h"

@interface PhotoGalleryController ()

@end

@implementation PhotoGalleryController

@synthesize galleryName = _galleryName;

- (id)initWithGalleryName:(NSString *)galleryName {
    if ((self = [self initWithNibName:nil bundle:nil])) {
        self.galleryName = galleryName;
        _isLoaded = NO;
    }
    return self;
}

- (void)loadView {
    [super loadView];
    
    if (!_isLoaded)
    {
/*        NSFileManager *fileManager = [NSFileManager defaultManager];
        NSURL *bundleURL = [[NSBundle mainBundle] bundleURL];
        NSArray *contents = [fileManager contentsOfDirectoryAtURL:bundleURL
                                       includingPropertiesForKeys:@[]
                                                          options:NSDirectoryEnumerationSkipsHiddenFiles
                                                            error:nil];
        
        NSPredicate *predicate = [NSPredicate predicateWithFormat:@"pathExtension == 'jpg'"];
        _photosNumber = [[contents filteredArrayUsingPredicate:predicate] count];*/
        
        NSString *dir = @"www/images/gallery/";
        _photosNumber = [[[NSBundle mainBundle] pathsForResourcesOfType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]] count];
        
        self.photoAlbumView.dataSource = self;
        self.photoScrubberView.dataSource = self;

        [self.photoAlbumView reloadData];
        [self.photoScrubberView reloadData];
        
        _isLoaded = YES;
    }
}

- (void)viewDidUnload {
    _isLoaded = NO;
    
    [super viewDidUnload];
}

- (void)didReceiveMemoryWarning
{
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (NSInteger)numberOfPhotosInScrubberView:(NIPhotoScrubberView *)photoScrubberView
{
    return _photosNumber;
}

- (UIImage *)photoScrubberView: (NIPhotoScrubberView *)photoScrubberView
              thumbnailAtIndex: (NSInteger)thumbnailIndex
{
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *file = [NSString stringWithFormat:@"%d", thumbnailIndex+1];
    NSString *dir = @"www/images/gallery/";
    UIImage* image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/thumbs"]]];
    
    return image;
}

- (NSInteger)numberOfPagesInPagingScrollView:(NIPhotoAlbumScrollView *)photoScrollView
{
    return _photosNumber;
}

- (UIImage *)photoAlbumScrollView: (NIPhotoAlbumScrollView *)photoAlbumScrollView
                     photoAtIndex: (NSInteger)photoIndex
                        photoSize: (NIPhotoScrollViewPhotoSize *)photoSize
                        isLoading: (BOOL *)isLoading
          originalPhotoDimensions: (CGSize *)originalPhotoDimensions {
    NSBundle *mainBundle = [NSBundle mainBundle];
    NSString *file = [NSString stringWithFormat:@"%d", photoIndex+1];
    NSString *dir = @"www/images/gallery/";
    UIImage* image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]]];
    *photoSize = NIPhotoScrollViewPhotoSizeOriginal;
    *originalPhotoDimensions = [image size];
    
    return image;
}

- (id<NIPagingScrollViewPage>)pagingScrollView:(NIPagingScrollView *)pagingScrollView pageViewForIndex:(NSInteger)pageIndex {
    return [self.photoAlbumView pagingScrollView:pagingScrollView pageViewForIndex:pageIndex];
}

@end
