import React from "react";
import { Link } from "react-router-dom";
import parse from 'html-react-parser';
import {ReactComponent as ArrowRight} from '../assets/arrow-right.svg'

const BlogCard = ({blogImage, blogTitle, blogSubtext}) => {
  return (
    <div className="flex blog-card">
      <div className="flex blog-card__image-content">
          <div className="blog-card__image">
            <img src={blogImage} alt="blog one" />
          </div>
          <div className="blog-card__content">
            <p>
                {parse(blogTitle)}
            </p>
            <p>
                {parse(blogSubtext)}
            </p>
          </div>
      </div>
      <Link to="/" className="flex blog-card__link">
        <ArrowRight />
      </Link>
    </div>
  );
};

export default BlogCard;
