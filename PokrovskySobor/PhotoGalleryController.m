//
//  PhotoGalleryController.m
//  PokrovskySobor
//
//  Created by GoloVaZa on 06.01.14.
//  Copyright (c) 2014 pbsputnik. All rights reserved.
//

#import "PhotoGalleryController.h"
#import "CaptionedPhotoView.h"

@interface PhotoGalleryController ()

@end

@implementation PhotoGalleryController

@synthesize galleryName = _galleryName, closeButton;

- (id)initWithGalleryName:(NSString *)galleryName {
    if ((self = [self initWithNibName:nil bundle:nil])) {
        self.galleryName = galleryName;
        _isLoaded = NO;
        
        // Добавляем кнопку для закрытия
        UIButton *button = [UIButton buttonWithType:UIButtonTypeCustom];
        button.frame = CGRectMake(698.0, 30.0, 40.0, 40.0);
        [button setImage:[UIImage imageNamed:@"close.png"] forState:UIControlStateNormal];
        [button addTarget:(id)self action:@selector(closeButtonPressed) forControlEvents:UIControlEventTouchUpInside];
        self.closeButton = button;
        [self.view addSubview:self.closeButton];

    }
    return self;
}

-(void)closeButtonPressed
{
    [self.view removeFromSuperview];
}

/*- (void)loadView {
    [super loadView];*/
- (void)viewDidLoad {
        [super viewDidLoad];
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
        
        _images = [[NSMutableArray alloc] init];
        for (unsigned i = 0; i < _photosNumber; i++) {
            [_images addObject:[NSNull null]];
        }
        
        self.photoAlbumView.dataSource = self;
        self.photoScrubberView.dataSource = self;

        [self.photoAlbumView reloadData];
        [self.photoScrubberView reloadData];
        
        _isLoaded = YES;
    }
}

- (void)viewDidUnload {
    _isLoaded = NO;
    _images = nil;
    
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
    UIImage *image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/thumbs"]]];
    
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
    UIImage *image = [_images objectAtIndex:photoIndex];
    if ((NSNull *)image != [NSNull null])
    {
        *photoSize = NIPhotoScrollViewPhotoSizeOriginal;
    }
    else
    {
        NSBundle *mainBundle = [NSBundle mainBundle];
        NSString *file = [NSString stringWithFormat:@"%d", photoIndex+1];
        NSString *dir = @"www/images/gallery/";
        image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[dir stringByAppendingString:_galleryName]]];
/*        image = [UIImage imageWithContentsOfFile:[mainBundle pathForResource:file ofType:@"jpg" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/thumbs"]]];*/
        *photoSize = NIPhotoScrollViewPhotoSizeOriginal;
        *originalPhotoDimensions = [image size];
        //[_images replaceObjectAtIndex:photoIndex withObject:image];
    }
    //NSLog(@"get photo at index: %d", photoIndex);
    //return [_images objectAtIndex:photoIndex];
    return image;
}

/*
- (id<NIPagingScrollViewPage>)pagingScrollView:(NIPagingScrollView *)pagingScrollView pageViewForIndex:(NSInteger)pageIndex {
    return [self.photoAlbumView pagingScrollView:pagingScrollView pageViewForIndex:pageIndex];
}*/

- (void)setChromeVisibility:(BOOL)isVisible animated:(BOOL)animated
{
    [super setChromeVisibility:isVisible animated:animated];
    
    if (isVisible)
    {
        closeButton.hidden = NO;
    }
    else closeButton.hidden = YES;
    
}

- (UIView<NIPagingScrollViewPage>*)pagingScrollView:(NIPagingScrollView *)pagingScrollView pageViewForIndex:(NSInteger)pageIndex {
    UIView<NIPagingScrollViewPage>* pageView = nil;
    NSString* reuseIdentifier = NSStringFromClass([CaptionedPhotoView class]);
    pageView = [pagingScrollView dequeueReusablePageWithIdentifier:reuseIdentifier];
    if (nil == pageView) {
        pageView = [[CaptionedPhotoView alloc] init];
        pageView.reuseIdentifier = reuseIdentifier;
    }
    
    NIPhotoScrollView* photoScrollView = (NIPhotoScrollView *)pageView;
    photoScrollView.photoScrollViewDelegate = self.photoAlbumView;
    photoScrollView.zoomingAboveOriginalSizeIsEnabled = [self.photoAlbumView isZoomingAboveOriginalSizeEnabled];
    
    NSString *file = [NSString stringWithFormat:@"%d", pageIndex+1];
    NSString *dir = @"www/images/gallery/";
    NSString *path = [[NSBundle mainBundle] pathForResource:file ofType:@"txt" inDirectory:[[dir stringByAppendingString:_galleryName] stringByAppendingString:@"/captions"]];
    NSString *caption = [NSString stringWithContentsOfFile:path encoding:NSUTF8StringEncoding error:NULL];
    
    CaptionedPhotoView* captionedView = (CaptionedPhotoView *)pageView;
    captionedView.caption = caption;
    
    return pageView;
}

@end
