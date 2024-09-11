import { useIsMobile } from "@/hooks";
import { constants } from "@/lib/constants";
import { Box, InputBase, Button } from "@mui/material";
import { SearchNormal1 } from "iconsax-react";

type SearchBarProps = {
  width: string;
  height: string;
  onChange?: (value: string) => void;
  value?: string;
  onKeyPress?: (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSearch?: () => void;
  onClear?: () => void;
  focused?: boolean;
};

const SearchBar = ({
  width,
  height,
  onChange,
  value,
  onKeyPress,
  onSearch,
  onClear,
  focused = false,
}: SearchBarProps) => {
  const isMobile = useIsMobile();

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        marginInline: { xs: "0px 10px", sm: "20px", md: "40px" },
        width,
        height: { xs: "25px", sm: "40px", md: height },
        border: `1px solid ${constants.palette.grey[700]}`,
        borderRadius: `calc(${height}/2)`,
      }}
    >
      <Box
        sx={{
          paddingLeft: { xs: "10px", sm: "18px", md: `calc(${height}/3)` },
          height: "100%",
          position: "absolute",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isMobile && (
          <SearchNormal1 size="10" color={constants.palette.grey[700]} />
        )}
        {!isMobile && (
          <SearchNormal1
            size={`calc(${height}/3)`}
            color={constants.palette.grey[700]}
          />
        )}
      </Box>
      <InputBase
        onFocus={(e) => {
          if (!focused) e.target.blur();
        }}
        placeholder="Search"
        inputProps={{ "aria-label": "search" }}
        value={value}
        onChange={(e) => {
          if (onChange) onChange(e.target.value);
        }}
        onKeyDown={(e) => {
          if (onKeyPress) onKeyPress(e);
        }}
        sx={{
          flexGrow: 1,
          paddingLeft: { xs: "25px", sm: "35px", md: `${height}` },
          paddingRight: { xs: "10px", md: `calc(${height}/3)` },
          color: constants.palette.text.secondary,
          height: { xs: "25px", sm: "40px", md: height },
          "& > input": {
            fontSize: { xs: "10px", sm: "18px", md: `calc(${height}/3)` },
          },
          "&::placeholder": {
            color: constants.palette.text.secondary,
            opacity: 0,
          },
        }}
        autoFocus={focused}
      />
      {onSearch && (
        <Button
          variant="outlined"
          onClick={onSearch}
          sx={{
            alignSelf: "center",
            marginRight: "4px",
            fontSize: { xs: "10px", sm: "14px", md: "18px" },
            height: "60%",
            width: { xs: "5%", sm: "10%", md: "12%" },
            minWidth: { xs: "40px", sm: "60px" },
          }}
        >
          Search
        </Button>
      )}
      {onClear && (
        <Button
          variant="outlined"
          onClick={onClear}
          sx={{
            alignSelf: "center",
            marginRight: { xs: "10px", sm: "18px", md: `calc(${height}/3)` },
            fontSize: { xs: "10px", sm: "14px", md: "18px" },
            height: "60%",
            width: { xs: "5%", sm: "10%", md: "12%" },
            minWidth: { xs: "40px", sm: "60px" },
          }}
        >
          Clear
        </Button>
      )}
    </Box>
  );
};

export default SearchBar;
