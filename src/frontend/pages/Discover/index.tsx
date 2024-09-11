import React, { useEffect } from "react";
import "../styles/LandingPage.css";
import { Button, Divider, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CreatePost from "./CreateNewPost";
import { PostUser } from "../../../declarations/backend/backend.did";
import { useSnackbar } from "notistack";
import FilterPosts from "./PostsFilters";
import ViewPost from "./ViewUpdatePost";
import { useBackendContext } from "../../contexts/BackendContext";

const Discover = () => {
  const { backendActor } = useBackendContext();
  const { searchValue } = useSelector((state: any) => state.uiState);
  const { isLoggedIn } = useSelector((state: any) => state.uiState);

  const [posts, setPosts] = React.useState<Array<PostUser>>([]); //TODO use redux for this
  const [current_page, setPage] = React.useState<number>(0);
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const delayedSearch = async () => {
      // TODO later add a Button for deep search_popper in cuz query can cost cycles.
      if (searchValue.length > 0) {
        let res: Array<PostUser> = await backendActor.search_posts(searchValue);
        res && setPosts(res);
      } else {
        setPage(0);
        setPosts([]);
        await set_posts();
      }
    };

    // Clear the previous timeout
    clearTimeout(timeoutId);

    // Set a new timeout
    timeoutId = setTimeout(delayedSearch, 300);

    // Cleanup function
    return () => clearTimeout(timeoutId);
  }, [searchValue]);

  async function set_posts() {
    posts.length > 0 && setPage(posts.length);
    let res: Array<PostUser> = await backendActor.get_posts(
      BigInt(current_page),
      BigInt(current_page + 10),
    );

    if (res && res.length > 0) {
      setPosts((pre) => {
        return posts.length == 0 ? [...res] : [...pre, ...res];
      });
    } else if (res && res.length == 0) {
      enqueueSnackbar("There are no more posts to load.", { variant: "info" });
    } else {
      enqueueSnackbar("undefined Error getting posts.", { variant: "error" });
    }
  }

  useEffect(() => {
    (async () => {
      await set_posts();
    })();
  }, []);

  return (
    <Grid
      sx={{
        marginLeft: "20%",
        marginRight: "20%",
      }}
    >
      {isLoggedIn && <CreatePost setPosts={setPosts} />}
      <Divider />
      <FilterPosts initPosts={posts} setPage={setPage} setPosts={setPosts} />
      {posts &&
        posts.map((post: PostUser) => {
          return (
            <Grid
              item
              sx={{
                my: 1,
                // mx: 'auto',
              }}
            >
              <ViewPost setPosts={setPosts} post={post} />
            </Grid>
          );
        })}

      <Button
        onClick={async () => {
          await set_posts();
        }}
      >
        Load more
      </Button>
    </Grid>
  );
};
export default Discover;
