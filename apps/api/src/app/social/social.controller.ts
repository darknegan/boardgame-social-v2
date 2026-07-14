import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import {
  CreateCommentDto,
  CreatePostDto,
  FeedPost,
  Friend,
  FriendRequestDto,
  PostComment,
} from '@bgs/shared';
import { JwtAuthGuard } from '../supabase/jwt-auth.guard';
import { SocialService } from './social.service';

@Controller('social')
export class SocialController {
  constructor(private readonly socialService: SocialService) {}

  @Get('feed')
  @UseGuards(JwtAuthGuard)
  getFeed(@Req() req: { user: { id: string } }): Promise<FeedPost[]> {
    return this.socialService.getFeed(req.user.id);
  }

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  createPost(
    @Req() req: { user: { id: string } },
    @Body() body: CreatePostDto,
  ): Promise<FeedPost> {
    return this.socialService.createPost(req.user.id, body);
  }

  @Post('posts/:id/like')
  @UseGuards(JwtAuthGuard)
  likePost(
    @Req() req: { user: { id: string } },
    @Param('id') postId: string,
  ): Promise<{ liked: boolean }> {
    return this.socialService.toggleLike(req.user.id, postId);
  }

  @Post('posts/:id/comments')
  @UseGuards(JwtAuthGuard)
  commentOnPost(
    @Req() req: { user: { id: string } },
    @Param('id') postId: string,
    @Body() body: CreateCommentDto,
  ): Promise<PostComment> {
    return this.socialService.addComment(req.user.id, postId, body);
  }

  @Get('friends')
  @UseGuards(JwtAuthGuard)
  getFriends(@Req() req: { user: { id: string } }): Promise<Friend[]> {
    return this.socialService.getFriends(req.user.id);
  }

  @Post('friends/requests')
  @UseGuards(JwtAuthGuard)
  sendFriendRequest(
    @Req() req: { user: { id: string } },
    @Body() body: FriendRequestDto,
  ): Promise<Friend> {
    return this.socialService.sendFriendRequest(req.user.id, body.username);
  }

  @Post('friends/requests/:id/accept')
  @UseGuards(JwtAuthGuard)
  acceptFriendRequest(
    @Req() req: { user: { id: string } },
    @Param('id') requestId: string,
  ): Promise<Friend> {
    return this.socialService.acceptFriendRequest(req.user.id, requestId);
  }
}
