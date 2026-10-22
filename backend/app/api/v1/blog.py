from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import BlogPost, ActivityItem
from app.schemas.schemas import BlogPostCreate, BlogPostUpdate, BlogPostResponse, BlogAuthor

router = APIRouter(prefix="/blog", tags=["Blog"])

@router.get("", response_model=List[BlogPostResponse])
def get_posts(
    search: Optional[str] = Query(None),
    status: Optional[str] = Query(None),
    db: Session = Depends(get_db)
):
    query = db.query(BlogPost)
    if search:
        s = f"%{search.lower()}%"
        query = query.filter(BlogPost.title.ilike(s) | BlogPost.content.ilike(s))
    if status and status != "ALL":
        query = query.filter(BlogPost.status == status)
        
    posts = query.order_by(BlogPost.created_at.desc()).all()
    return [
        BlogPostResponse(
            id=p.id,
            title=p.title,
            slug=p.slug,
            excerpt=p.excerpt or "",
            content=p.content or "",
            coverImage=p.cover_image or "",
            author=BlogAuthor(**(p.author or {"name": "Pixel Team", "avatar": "", "role": "Author"})),
            category=p.category or "Engineering",
            tags=p.tags or [],
            status=p.status,
            views=p.views or 0,
            publishedAt=p.published_at or "",
            readingTime=p.reading_time or "5 min read"
        ) for p in posts
    ]

@router.get("/{post_id}", response_model=BlogPostResponse)
def get_post(post_id: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter((BlogPost.id == post_id) | (BlogPost.slug == post_id)).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt or "",
        content=post.content or "",
        coverImage=post.cover_image or "",
        author=BlogAuthor(**(post.author or {"name": "Pixel Team", "avatar": "", "role": "Author"})),
        category=post.category or "Engineering",
        tags=post.tags or [],
        status=post.status,
        views=post.views or 0,
        publishedAt=post.published_at or "",
        readingTime=post.reading_time or "5 min read"
    )

@router.post("", response_model=BlogPostResponse, status_code=status.HTTP_201_CREATED)
def create_post(data: BlogPostCreate, db: Session = Depends(get_db)):
    existing = db.query(BlogPost).filter(BlogPost.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
        
    post = BlogPost(
        title=data.title,
        slug=data.slug,
        excerpt=data.excerpt,
        content=data.content,
        cover_image=data.coverImage or "",
        author=data.author.dict(),
        category=data.category,
        tags=data.tags,
        status=data.status,
        views=data.views,
        reading_time=data.readingTime,
        published_at=data.publishedAt or ""
    )
    db.add(post)
    db.add(ActivityItem(
        user="Admin User",
        action="drafted technical article",
        target=post.title,
        type="blog"
    ))
    db.commit()
    db.refresh(post)
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt or "",
        content=post.content or "",
        coverImage=post.cover_image or "",
        author=BlogAuthor(**post.author),
        category=post.category,
        tags=post.tags,
        status=post.status,
        views=post.views,
        publishedAt=post.published_at or "",
        readingTime=post.reading_time
    )

@router.put("/{post_id}", response_model=BlogPostResponse)
def update_post(post_id: str, data: BlogPostUpdate, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
        
    update_data = data.dict(exclude_unset=True)
    if "coverImage" in update_data:
        update_data["cover_image"] = update_data.pop("coverImage")
    if "readingTime" in update_data:
        update_data["reading_time"] = update_data.pop("readingTime")
    if "publishedAt" in update_data:
        update_data["published_at"] = update_data.pop("publishedAt")
    if "author" in update_data and update_data["author"] is not None:
        author = update_data.pop("author")
        post.author = author.dict() if hasattr(author, "dict") else author
        
    for k, v in update_data.items():
        if hasattr(post, k) and v is not None:
            setattr(post, k, v)
            
    db.commit()
    db.refresh(post)
    return BlogPostResponse(
        id=post.id,
        title=post.title,
        slug=post.slug,
        excerpt=post.excerpt or "",
        content=post.content or "",
        coverImage=post.cover_image or "",
        author=BlogAuthor(**post.author),
        category=post.category,
        tags=post.tags,
        status=post.status,
        views=post.views,
        publishedAt=post.published_at or "",
        readingTime=post.reading_time
    )

@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_post(post_id: str, db: Session = Depends(get_db)):
    post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    db.delete(post)
    db.commit()
    return None
