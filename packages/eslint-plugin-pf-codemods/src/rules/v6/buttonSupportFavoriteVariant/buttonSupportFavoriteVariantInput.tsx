import { Button } from "@patternfly/react-core";
import { StarIcon, SomeIcon } from "@patternfly/react-icons";

export const ButtonSupportFavoriteVariantInput = () => (
  <>
    {/* Simple case - can be auto-fixed */}
    <Button>
      <StarIcon />
    </Button>

    {/* StarIcon in icon prop - can be auto-fixed */}
    <Button icon={<StarIcon />} />

    {/* StarIcon with existing props - can be auto-fixed */}
    <Button variant="primary">
      <StarIcon />
    </Button>

    {/* StarIcon with text - warning only */}
    <Button>
      Favorite <StarIcon />
    </Button>

    {/* StarIcon with other icon - warning only */}
    <Button>
      <SomeIcon />
      <StarIcon />
    </Button>

    {/* StarIcon in fragment - warning only */}
    <Button>
      <>Favorite <StarIcon /></>
    </Button>

    {/* Already using new props - should be ignored */}
    <Button isFavorite={true} />
    <Button isFavorited={true} />
  </>
);
