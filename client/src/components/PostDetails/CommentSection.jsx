import { Button, Divider, TextField, Typography } from '@material-ui/core';
import React, { useRef, useState } from 'react';

import { commentPost } from '../../actions/posts';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import useStyles from './styles';

const CommentSection = ({ post }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));

  const commentsRef = useRef();

  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');

  const handleCommentClick = async () => {
    const newComments = await dispatch(
      commentPost(user.result.name, comment.trim(), post._id),
    );

    setComments(newComments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography variant="h6" gutterBottom>
            Comments
          </Typography>
          {comments?.map((comment) => (
            // CHANGE i index
            <div key={comment._id} style={{ marginBottom: '10px' }}>
              <div className={classes.comment}>
                <div style={{ width: '50%', marginInlineEnd: '10px' }}>
                  <Typography
                    variant="subtitle1"
                    style={{ fontWeight: 'bold' }}>
                    {comment.name}
                  </Typography>
                  <Typography variant="subtitle2" gutterBottom>
                    {moment(comment.createdAt).fromNow()}
                  </Typography>
                </div>
                <Typography variant="subtitle2" gutterBottom>
                  {comment.comment}
                </Typography>
              </div>
              <Divider />
            </div>
          ))}
          <div ref={commentsRef} />
        </div>
        {user?.result?.name && (
          <div style={{ width: '50%' }}>
            <Typography variant="h6" gutterBottom>
              Write a comment
            </Typography>
            <TextField
              fullWidth
              rows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button
              style={{ marginTop: '10px' }}
              fullWidth
              disabled={!comment}
              variant="contained"
              color="primary"
              onClick={handleCommentClick}>
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
