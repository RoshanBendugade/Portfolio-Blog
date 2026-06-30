import Button from "../ui/Button";

function HeroButtons() {
  return (
    <div className="flex gap-5 mt-10">

      <Button>
        View Projects
      </Button>

      <Button variant="secondary">
        Contact Me
      </Button>

    </div>
  );
}

export default HeroButtons;